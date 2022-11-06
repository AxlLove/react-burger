import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {updateUser} from "../../utils/Api";

const sliceName = 'updateUser'

const initialState = {
    onLoad: false,
    onError: false,
    errorMessage: ''
};

export const updateUserInfo = createAsyncThunk(`${sliceName}/update`, async function ({email, password, name}, {rejectWithValue}) {
        console.log(email, password, name)
        return await
            updateUser(name, email, password )
                .then((res) => {
                    console.log(res)
                    return res
                })
                .catch((err) => {
                    console.log(err)
                    return rejectWithValue(err.message)
                })
    }
)

export const updateUserSlice = createSlice({
    name: sliceName,
    initialState,
    extraReducers:  {
        [updateUserInfo.pending]: (state) => {
            state.onLoad = true;
            state.onError = false
        },
        [updateUserInfo.fulfilled]: (state) => {
            state.onLoad = false;
        },
        [updateUserInfo.rejected]: (state, action) => {
            state.onLoad = false;
            state.onError = true;
            if(action.payload === 'User with such email already exists') {
                state.errorMessage = 'Пользователь с данным E-mail уже зарегестрирован'
                return
            }
            state.errorMessage = 'На сервере произошла ошибка, попробуйте еще раз!'
        },
    }
})
const {reducer} = updateUserSlice;

export default reducer