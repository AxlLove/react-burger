import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {login} from "../../utils/Api";
import { saveTokens } from "../../utils/tokens";

const sliceName = 'loginUser'

const initialState = {
        onLoad: false,
        onError: false,
        errorMessage: ''
};

export const loginUser = createAsyncThunk(`${sliceName}/login`, async function ({email, password},  ) {
        console.log(email, password)
        return await
            login(email, password)
                .then((res) => {
                    saveTokens(res)
                return res
                })
                .catch((err) => {
                    return err
                })
    }
)

export const loginUserSlice = createSlice({
    name: sliceName,
    initialState,
    extraReducers:  {
        [loginUser.pending]: (state) => {
            state.onLoad = true;
            state.onError = false
        },
        [loginUser.fulfilled]: (state) => {
            state.onLoadRegister = false;
        },
        [loginUser.rejected]: (state, action) => {
            state.onLoad = false;
            state.onError = true;
            state.errorMessage = action.payload.message

        },
    }
})
const {reducer} = loginUserSlice;

export default reducer