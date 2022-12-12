import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {makeAnOrder, refreshToken} from "../../utils/Api";
import {saveTokens} from "../../utils/tokens";
import { ISuccessOrderRequest } from "../../utils/Api";
const sliceName = 'order'

interface IOrderSlice {
    orderDetails: ISuccessOrderRequest | null;
    onLoad: boolean;
    onError: boolean;
}
interface IOrderData {
    ingredients: Array<string>
}
const initialState: IOrderSlice = {
    orderDetails: null,
    onLoad: false,
    onError: false,
};

export const fetchOrder = createAsyncThunk(`${sliceName}/fetchOrder`, async function (orderData: IOrderData, {rejectWithValue}) {

        try {
            return await makeAnOrder(orderData)
        } catch (err) {
            const { message } = err as { message: string }
            if (message === 'jwt expired' || message === "jwt malformed") {
                const tokens = await refreshToken()
                saveTokens(tokens)
                return await makeAnOrder(orderData)
            }
            return rejectWithValue(message)
        }
    }
)
export const orderSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrder.pending, (state)=> {
                state.onLoad = true;
                state.onError = false
            })
            .addCase(fetchOrder.fulfilled, (state, action)=> {
                state.onLoad = false;
                state.orderDetails = action.payload
            })
            .addCase(fetchOrder.rejected, (state)=> {
                state.onLoad = false;
                state.onError = true
            })
    }
})
const {reducer} = orderSlice;

export default reducer