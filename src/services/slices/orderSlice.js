import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {makeAnOrder} from "../../utils/Api";

const sliceName = 'order'

const initialState = {
    orderDetails: null,
    onLoadOrder: false,
    onErrorOrder: false,
};

export const fetchOrder = createAsyncThunk(`${sliceName}/fetchOrder`, async function (orderData) {
        return await
            makeAnOrder(orderData).then(res => {
                return res
            })
                .catch((res) => {
                    throw new Error(`Ошибка ${res}`)
                })
    }
)
export const orderSlice = createSlice({
    name: sliceName,
    initialState,
    extraReducers:  {
        [fetchOrder.pending]: (state) => {
            state.onLoadOrder = true;
            state.onErrorOrder = false
        },
        [fetchOrder.fulfilled]: (state, action) => {
            state.onLoadOrder = false;
            state.orderDetails = action.payload
        },
        [fetchOrder.rejected]: (state) => {
            state.onLoadOrder = false;
            state.onErrorOrder = true
        },
    }
})
const {reducer} = orderSlice;

export default reducer