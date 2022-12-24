import {createAction, createSlice} from "@reduxjs/toolkit";
import {IWsFeedOrders, WebSocketStatus} from "../../types/types";


interface IFeedSlice {
    status:string;
    connectingError: string;
    data: IWsFeedOrders | null
}

const sliceName = 'feedSlice'

const initialState: IFeedSlice  = {
    status: WebSocketStatus.OFFLINE,
    connectingError: '',
    data: null,
}

export const wsConnecting = createAction('WEB_SOCKED_CONNECTING')
export const connect = createAction<string, 'WEB_SOCKED_CONNECT'>('WEB_SOCKED_CONNECT')
export const disconnect = createAction('WEB_SOCKED_DISCONNECT')
export const wsOpen = createAction('WEB_SOCKED_OPEN')
export const wsClose = createAction('WEB_SOCKED_CLOSE')
export const wsError = createAction<string, 'WEB_SOCKED_ERROR'>('WEB_SOCKED_ERROR')
export const wsMessage = createAction<IWsFeedOrders, 'WEB_SOCKED_MESSAGE'>('WEB_SOCKED_MESSAGE')

 const feedSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        deleteOrderData: state => {
            state.data = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(wsConnecting, (state) => {
                state.status = WebSocketStatus.CONNECTING;
            })
            .addCase(wsOpen, (state) => {
                state.status = WebSocketStatus.ONLINE;
            })
            .addCase(wsClose, (state) => {
                state.status = WebSocketStatus.OFFLINE;
            })
            .addCase(wsError, (state, action) => {
                state.connectingError = action.payload;
            })
            .addCase(wsMessage, (state, action) => {
                state.data = action.payload;
            })
    }

})

const {reducer} = feedSlice;
export const {deleteOrderData} = feedSlice.actions
export default reducer