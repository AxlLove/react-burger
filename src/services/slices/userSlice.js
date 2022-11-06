import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {saveTokens} from "../../utils/tokens";
import {registerUser} from '../slices/registerUserSlice'
import {loginUser} from '../slices/loginUserSlice'
import {userRequest, refreshToken, logout} from "../../utils/Api";
import {deleteCookie} from "../../utils/coockie";
import {updateUserInfo} from "./updateUserSlice";

const sliceName = 'user'

const initialState = {
    userInfo: null,
    onLoad: false,
    onError: false,
    onLogout: false,
    onLogoutError: false,
    errorMessage: '',
    errorLogoutMessage: ''
};

export const getUser = createAsyncThunk(`${sliceName}/getUser`, async function (_, {rejectWithValue}) {
        try {
            return await userRequest()
        } catch (err) {
            console.log('попал в ошибку')
            if (err.message === 'jwt expired') {
                console.log('рефрешит токен')
                const tokens = await refreshToken()
                //TODO протестить на ошибку
                saveTokens(tokens)
                return await userRequest()
            }
            return rejectWithValue(err.message)
        }
    }
)
export const logoutUser = createAsyncThunk(`${sliceName}/logout`, async function (_, {rejectWithValue}) {
        return await logout()
            .then(() => {
                deleteCookie('token')
                localStorage.removeItem('refreshToken')
            })
            .catch((err) => {
                return rejectWithValue(err.message)
            })
    }
)


export const userSlice = createSlice({
    name: sliceName,
    initialState,
    extraReducers: builder => {
        builder
            .addCase(getUser.pending, (state, action) => {
                state.onLoad = true;
                state.onError = false;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.onLoad = false;
                state.userInfo = action?.payload?.user
            })
            .addCase(getUser.rejected, (state, action) => {
                state.onLoad = false;
                state.onError = true;
            })
            .addCase(logoutUser.pending, (state, action) => {
                state.onLogout = true;
                state.onLogoutError = false;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.onLogout = false;
                state.onLogoutError = false;
                state.userInfo = null
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.onLogout = false;
                state.onLogoutError = true;
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