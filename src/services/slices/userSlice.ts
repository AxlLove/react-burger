import {createSlice} from "@reduxjs/toolkit";
import {registerUser} from './registerUserSlice'
import {loginUser} from './loginUserSlice'
import {updateUserInfo} from "./updateUserSlice";
import {getUser} from "./getUserSlice";
import {logoutUser} from "./logoutUserSlice";

interface IUserInfo {
    userInfo: {
        email: string;
        name: string;
    } | null
}
const sliceName = 'user'

const initialState: IUserInfo = {
    userInfo: null,
};


export const userSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getUser.fulfilled, (state, action) => {
                state.userInfo = action?.payload?.user
            })
            .addCase(logoutUser.fulfilled, (state) => {
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
            .addCase(updateUserInfo.rejected, (state) => {
                state.userInfo = null
            })
            .addCase(logoutUser.rejected, (state) => {
                state.userInfo = null
            })
            .addCase(getUser.rejected, (state) => {
                state.userInfo = null
            })
    }
})

const {reducer} = userSlice;

export default reducer