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
            const { message } = err as { message: string }
            console.log(message)
            if ( message === 'jwt expired' || message === "jwt malformed") {
                const tokens = await refreshToken()
                saveTokens(tokens)
                return await userRequest()
            }
            return rejectWithValue(message)
        }
    }
)


export const getUserUserSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state)=> {
                state.onLoad = true;
                state.onError = false;
            })
            .addCase(getUser.fulfilled, (state) => {
                state.onLoad = false;
            })
            .addCase(getUser.rejected, (state) => {
                state.onLoad = false;
                state.onError = true;
            })
    }
})
const {reducer} = getUserUserSlice;

export default reducer