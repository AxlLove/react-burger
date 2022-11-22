import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {register} from "../../utils/Api";
import {saveTokens} from "../../utils/tokens";

const sliceName = 'registerUser'

const initialState = {
    onLoad: false,
    onError: false,
    errorMessage: ''
};

export const registerUser = createAsyncThunk(`${sliceName}/register`, async function ({
                                                                                          email,
                                                                                          password,
                                                                                          name
                                                                                      }, {rejectWithValue}) {
        return await
            register(email, password, name)
                .then((res) => {
                    saveTokens(res)
                    return res
                })
                .catch((err) => {
                    return rejectWithValue(err.message)
                })
    }
)

export const registerUserSlice = createSlice({
    name: sliceName,
    initialState,
    extraReducers: {
        [registerUser.pending]: (state) => {
            state.onLoad = true;
            state.onError = false
        },
        [registerUser.fulfilled]: (state) => {
            state.onLoad = false;
        },
        [registerUser.rejected]: (state, action) => {
            state.onLoad = false;
            state.onError = true;
            console.log(action.payload)
            if (action.payload === 'User already exists') {
                state.errorMessage = 'Такой пользователь уже зарегестрирован!'
                return
            }
            state.errorMessage = 'На сервере произошла ошибка, попробуйте еще раз!'


        },
    }
})
const {reducer} = registerUserSlice;

export default reducer