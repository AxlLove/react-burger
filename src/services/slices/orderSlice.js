import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {makeAnOrder, refreshToken} from "../../utils/Api";
import {saveTokens} from "../../utils/tokens";

const sliceName = 'order'

const initialState = {
    orderDetails: null,
    onLoad: false,
    onError: false,
};

export const fetchOrder = createAsyncThunk(`${sliceName}/fetchOrder`, async function (orderData, {rejectWithValue}) {

        try {
            return await makeAnOrder(orderData)
        } catch (err) {
            if (err.message === 'jwt expired') {
                const tokens = await refreshToken()
                saveTokens(tokens)
                return await makeAnOrder(orderData)
            }
            return rejectWithValue(err.message)
        }
    }
)
export const orderSlice = createSlice({
    name: sliceName,
    initialState,
    extraReducers: {
        [fetchOrder.pending]: (state) => {
            state.onLoad = true;
            state.onError = false
        },
        [fetchOrder.fulfilled]: (state, action) => {
            state.onLoad = false;
            state.orderDetails = action.payload
        },
        [fetchOrder.rejected]: (state) => {
            state.onLoad = false;
            state.onError = true
        },
    }
})
const {reducer} = orderSlice;

export default reducer