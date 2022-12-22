import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IOrderDetail} from "../../types/types";
import {getOrderByNumber} from "../../utils/Api";


const sliceName = 'orderInfo'

interface IOrderInfoSlice {
    orderInfo: IOrderDetail | null;
    onLoad: boolean;
    onError: boolean;
    errorMessage: string;
}

const initialState: IOrderInfoSlice = {
    orderInfo: null,
    onError: false,
    onLoad: false,
    errorMessage: '',
};

export const fetchGetOrderByNumber = createAsyncThunk(`${sliceName}/fetchOrder`, async (number: number, {rejectWithValue}) => {
    return await getOrderByNumber(number)
        .then((res) => {
            return res
        })
        .catch(err=> {
            return rejectWithValue(err.message)
        })
})


export const orderInfoSlice = createSlice({
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
            .addCase(fetchGetOrderByNumber.rejected, (state, action) => {
                state.onLoad = false;
                state.onError = true
                state.errorMessage = action.payload as string;
            })
    }
})
const {reducer} = orderInfoSlice;
export const {deleteFeedOrderInfo} = orderInfoSlice.actions
export default reducer