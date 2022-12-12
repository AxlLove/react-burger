import {Middleware} from "redux";
import {RootState} from "../store";
import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";

export type TWsActionTypes = {
    wsConnecting: ActionCreatorWithoutPayload
    connect: ActionCreatorWithPayload<string>;
    disconnect: ActionCreatorWithoutPayload;
    wsOpen: ActionCreatorWithoutPayload;
    wsClose: ActionCreatorWithoutPayload;
    wsError: ActionCreatorWithPayload<string>
    wsMessage: ActionCreatorWithPayload<any>
}

export const createSockedMiddleware = (wsActions: TWsActionTypes): Middleware<{}, RootState> => {
    return (store) => {
        let socked: WebSocket | null = null;
        let url = '';
        let isConnected = false;
        let reconnectTimer = 0
        return (next) => (action) => {
            const {dispatch} = store;
            const {
                wsConnecting,
                connect,
                disconnect,
                wsOpen,
                wsClose,
                wsError,
                wsMessage,
            } = wsActions;

            if (connect.match(action)) {
                window.clearTimeout(reconnectTimer)
                url = action.payload;
                socked = new WebSocket(url)
                dispatch(wsConnecting())
            }
            if (socked) {
                socked.onopen = () => {
                    dispatch(wsOpen())
                }
                socked.onerror = () => {
                    dispatch(wsError('WebSocked Error'))
                }
                socked.onmessage = (event: MessageEvent) => {
                    const {data} = event;
                    const parsedData = JSON.parse(data)
                    dispatch(wsMessage(parsedData))
                }
                socked.onclose = (event: CloseEvent) => {
                    if (event.code !== 1000) {
                        dispatch(wsError(event.code.toString()))
                    }
                    if (isConnected) {
                        dispatch(wsConnecting())
                        reconnectTimer = window.setTimeout(() => {
                            dispatch(connect(url))
                        }, 3000)
                    }
                    dispatch(wsClose())
                }
                if (disconnect.match(action)) {
                    window.clearTimeout(reconnectTimer)
                    isConnected = false;
                    reconnectTimer = 0
                    socked.close()
                    dispatch(wsClose())
                }
            }
            next(action)
        }
    }
}