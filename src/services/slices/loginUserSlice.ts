import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {login} from "../../utils/Api";
import {saveTokens} from "../../utils/tokens";

const sliceName = 'loginUser'

const initialState = {
    onLoad: false,
    onError: false,
    errorMessage: ''
};
type TProps = {email: string, password: string}
export const loginUser = createAsyncThunk(`${sliceName}/login`, async function ({email, password}: TProps, {rejectWithValue}) {
        return await
            login(email, password)
                .then((res) => {
                    saveTokens(res)
                    return res
                })
                .catch((err) => {
                    return rejectWithValue(err.message)
                })
    }
)

export const loginUserSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, state => {
                state.onLoad = true;
                state.onError = false
            })
            .addCase(loginUser.fulfilled, state => {
                state.onLoad = false;
            })
            .addCase(loginUser.rejected, (state, action)=> {
                state.onLoad = false;
                state.onError = true;
                console.log(action.payload)
                if (action.payload === 'email or password are incorrect') {
                    state.errorMessage = 'E-mail или пароль введены неверно!'
                    return
                }
                state.errorMessage = 'Произошла ошибка, попробуйте еще раз!'

            })
    }
})
const {reducer} = loginUserSlice;

export default reducer