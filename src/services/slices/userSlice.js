import {createSlice} from "@reduxjs/toolkit";
import {registerUser} from './registerUserSlice'
import {loginUser} from './loginUserSlice'
import {updateUserInfo} from "./updateUserSlice";
import {getUser} from "./getUserSlice";
import {logoutUser} from "./logoutUserSlice";

const sliceName = 'user'

const initialState = {
    userInfo: null,
};


export const userSlice = createSlice({
    name: sliceName,
    initialState,
    extraReducers: builder => {
        builder
            .addCase(getUser.fulfilled, (state, action) => {
                state.userInfo = action?.payload?.user
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.userInfo = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.userInfo = action.payload.user
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.userInfo = action.payload.user
            })
            .addCase(updateUserInfo.fulfilled, (state, action) => {
                state.userInfo = action.payload.user
            })
    }
})
const {reducer} = userSlice;

export default reducer