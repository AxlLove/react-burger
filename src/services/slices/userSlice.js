import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { saveTokens } from "../../utils/tokens";
import {registerUser} from '../slices/registerUserSlice'
import {loginUser} from '../slices/loginUserSlice'
import { userRequest, refreshToken, logout } from "../../utils/Api";
const sliceName = 'user'

const initialState = {
        userInfo: null,
        onLoad: false,
        onError: false,
        onLogout: false,
        onLogutError: false,
        errorMessage: '', 
        errorLogoutMessage: ''
};

export const getUser = createAsyncThunk(`${sliceName}/getUser`, async function (_,  ) {
      return await  userRequest()
            .then((res)=> {
                console.log(res)
                return res
            })
            .catch((err)=> {
                console.log(err.message)
                if(err.message === 'jwt expired') {
                    refreshToken()
                        .then(res=> {
                            saveTokens(res)
                        })
                        .catch(err=> console.log(err))
                        return err
                }
                console.log(err)
                return err
            })
    }
)
export const logoutUser = createAsyncThunk(`${sliceName}/logout`, async function (_,  ) {
    return await  logout()
          .then((res)=> {
              return res
          })
          .catch((err)=> {
              return err
          })
  }
)


export const userSlice = createSlice({
    name: sliceName,
    initialState,
        extraReducers: builder => {
            builder
            .addCase(getUser.pending, (state, action)=> {
                state.onLoad = true;
                state.onError = false;
            })
            .addCase(getUser.fulfilled, (state, action)=> {
                state.onLoad = false;
                state.userInfo = action?.payload?.user
            })
            .addCase(getUser.rejected, (state, action)=> {
                state.onLoad = false;
                state.onError = true;
            })
            .addCase(logoutUser.pending, (state, action)=> {
                state.onLogout = true;
                state.onLogutError = false;
            })
            .addCase(logoutUser.fulfilled, (state, action)=> {
                state.onLogout = false;
                state.onLogutError = null
            })
            .addCase(logoutUser.rejected, (state, action)=> {
                state.onLogout = false;
                state.onLogutError = true;
            })
            .addCase(registerUser.fulfilled, (state, action)=>{
                state.userInfo = action.payload.user
            })
            .addCase(loginUser.fulfilled, (state, action)=> {
                state.userInfo = action.payload.user
            })
        }
})
const {reducer} = userSlice;

export default reducer