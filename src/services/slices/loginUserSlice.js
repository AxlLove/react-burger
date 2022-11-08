import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {login} from "../../utils/Api";
import {saveTokens} from "../../utils/tokens";

const sliceName = 'loginUser'

const initialState = {
    onLoad: false,
    onError: false,
    errorMessage: ''
};

export const loginUser = createAsyncThunk(`${sliceName}/login`, async function ({email, password}, {rejectWithValue}) {
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
    extraReducers: {
        [loginUser.pending]: (state) => {
            state.onLoad = true;
            state.onError = false
        },
        [loginUser.fulfilled]: (state) => {
            state.onLoad = false;
        },
        [loginUser.rejected]: (state, action) => {
            state.onLoad = false;
            state.onError = true;
            if (action.payload === 'email or password are incorrect') {
                state.errorMessage = 'E-mail ли пароль введены неверно!'
                return
            }
            state.errorMessage = 'На сервере произошла ошибка, попробуйте еще раз!'

        },
    }
})
const {reducer} = loginUserSlice;

export default reducer