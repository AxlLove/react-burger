import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {logout,} from "../../utils/Api";
import {deleteCookie} from "../../utils/coockie";
import {ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME} from "../../utils/constants";

const sliceName = 'logoutUser'

const initialState = {
    onLoad: false,
    onError: false,
    errorMessage: ''
};

export const logoutUser = createAsyncThunk(`${sliceName}/logout`, async function (_, {rejectWithValue}) {
        return await logout()
            .then((res) => {
                return res
            })
            .catch((err) => {
                return rejectWithValue(err.message)
            })
            .finally(()=> {
                deleteCookie(ACCESS_TOKEN_NAME)
                localStorage.removeItem(REFRESH_TOKEN_NAME)
            })
    }
)


export const logoutUserSlice = createSlice({
    name: sliceName,
    initialState,
    extraReducers: {
        [logoutUser.pending]: (state) => {
            state.onLoad = true;
            state.onError = false;
        },
        [logoutUser.fulfilled]: (state) => {
            state.onLoad = false;
        },
        [logoutUser.rejected]: (state) => {
            state.onLoad = false;
            state.onError = true;
        },
    }
})
const {reducer} = logoutUserSlice;

export default reducer