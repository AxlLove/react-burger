import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {register} from "../../utils/Api";

const sliceName = 'user'

const initialState = {
        userInfo: null,
        onLoadRegister: false,
        onErrorRegister: false,
        registerErrorMessage: ''
};

export const registerUser = createAsyncThunk(`${sliceName}/registerUser`, async function ({email, password, name},  ) {
        console.log(email, password, name)
        return await
            register(email, password, name ).then((res) => {
                return res
            })
                .catch((err) => {
                    return err
                })
    }
)
export const userSlice = createSlice({
    name: sliceName,
    initialState,
    extraReducers:  {
        [registerUser.pending]: (state) => {
            state.onLoadRegister = true;
            state.onErrorRegister = false
        },
        [registerUser.fulfilled]: (state, action) => {
            state.onLoadRegister = false;
            state.userInfo = action.payload.user
        },
        [registerUser.rejected]: (state, action) => {
            state.onLoadRegister = false;
            state.onErrorRegister = true;
            state.registerErrorMessage = action.payload.message

        },
    }
})
const {reducer} = userSlice;

export default reducer