import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {refreshToken, updateUser} from "../../utils/Api";
import {saveTokens} from "../../utils/tokens";
type TProps = {email: string, password: string, name: string};
const sliceName = 'updateUser'

const initialState = {
    onLoad: false,
    onError: false,
    errorMessage: ''
};

export const updateUserInfo = createAsyncThunk(`${sliceName}/update`, async function ({
                                                                                          email,
                                                                                          password,
                                                                                          name
                                                                                      }: TProps, {rejectWithValue}) {

        try {
            return await updateUser(name, email, password)
        } catch (err) {
            const { message } = err as { message: string }
            if (message === 'jwt expired') {
                const tokens = await refreshToken()
                saveTokens(tokens)
                return await updateUser(name, email, password)
            }
            return rejectWithValue(message)
        }
    }
)

export const updateUserSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder
            .addCase(updateUserInfo.pending, (state)=> {
                state.onLoad = true;
                state.onError = false;
            })
            .addCase(updateUserInfo.fulfilled, (state)=>{
                state.onLoad = false;
            })
            .addCase(updateUserInfo.rejected, (state, action)=>{
                state.onLoad = false;
                state.onError = true;
                if (action.payload === 'User with such email already exists') {
                    state.errorMessage = 'Пользователь с данным E-mail уже зарегестрирован'
                    return
                }
                state.errorMessage = 'На сервере произошла ошибка, попробуйте еще раз!'
            })
    }
})
const {reducer} = updateUserSlice;

export default reducer