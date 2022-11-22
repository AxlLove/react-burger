import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {refreshToken, userRequest} from "../../utils/Api";
import {saveTokens} from "../../utils/tokens";

const sliceName = 'getUser'

const initialState = {
    onLoad: false,
    onError: false,
    errorMessage: ''
};

export const getUser = createAsyncThunk(`${sliceName}/getUser`, async function (_, {rejectWithValue}) {
        try {
            return await userRequest()
        } catch (err) {
            if (err.message === 'jwt expired') {
                const tokens = await refreshToken()
                saveTokens(tokens)
                return await userRequest()
            }
            return rejectWithValue(err.message)
        }
    }
)


export const getUserUserSlice = createSlice({
    name: sliceName,
    initialState,
    extraReducers: {
        [getUser.pending]: (state) => {
            state.onLoad = true;
            state.onError = false;
        },
        [getUser.fulfilled]: (state) => {
            state.onLoad = false;
        },
        [getUser.rejected]: (state) => {
            state.onLoad = false;
            state.onError = true;
        },
    }
})
const {reducer} = getUserUserSlice;

export default reducer