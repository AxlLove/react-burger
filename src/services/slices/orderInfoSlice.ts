import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IOrderDetail} from "../../types/types";
import {getOrderByNumber} from "../../utils/Api";


const sliceName = 'orderInfo'

interface IOrderInfoSlice {
    orderInfo: IOrderDetail | null;
    onLoad: boolean;
    onError: boolean;
}

const initialState: IOrderInfoSlice = {
    orderInfo: null,
    onError: false,
    onLoad: false,
};

export const fetchGetOrderByNumber = createAsyncThunk(`${sliceName}/fetchOrder`, async (number: number, {rejectWithValue}) => {
    return await getOrderByNumber(number)
        .then((res) => {
            return res
        })
        .catch(rejectWithValue)
})


export const ingredientInfoSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        deleteFeedOrderInfo: (state) => {
            state.orderInfo = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetOrderByNumber.pending, (state) => {
                state.onLoad = true;
                state.onError = false
            })
            .addCase(fetchGetOrderByNumber.fulfilled, (state, action) => {
                state.onLoad = false;
                state.orderInfo = action.payload
            })
            .addCase(fetchGetOrderByNumber.rejected, (state) => {
                state.onLoad = false;
                state.onError = true
            })
    }
})
const {reducer} = ingredientInfoSlice;
export const {deleteFeedOrderInfo} = ingredientInfoSlice.actions
export default reducer