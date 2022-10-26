import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {getIngredients, makeAnOrder} from "../../utils/Api";

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
        [fetchOrder.pending]: (state, action) => {
            state.onLoadOrder = true;
            state.onErrorOrder = false
        },
        [fetchOrder.fulfilled]: (state, action) => {
            state.onLoadOrder = false;
            state.orderDetails = action.payload
        },
        [fetchOrder.rejected]: (state, action) => {
            state.onLoadOrder = false;
            state.onErrorOrder = true
        },
    }
})
const {reducer} = orderSlice;

export default reducer