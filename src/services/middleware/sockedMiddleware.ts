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

export const createSockedMiddleware = (wsActions: TWsActionTypes): Middleware<{}, RootState > => {
    return (store) => {
        let socked: WebSocket | null = null;
        let url = ''
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
                url = action.payload;
                console.log('connect', url)
                socked = new WebSocket(url)
                console.log('connect', socked)
                dispatch(wsConnecting())
            }
            if (socked) {
                socked.onopen = () => {
                    console.log('onopen')
                    dispatch(wsOpen())
                }
                socked.onerror = (event: Event) => {
                    dispatch(wsError('WebSocked Error'))
                }
                socked.onmessage = (event: MessageEvent) => {
                    const {data} = event;
                    const parsedData = JSON.parse(data)
                    console.log(parsedData)
                    dispatch(wsMessage(parsedData))
                }
                socked.onclose = () => {
                    dispatch(wsClose())
                }
                if (disconnect.match(action)) {
                    console.log('WebSocked disconnected')
                    socked.close()
                    dispatch(wsClose())
                }
            }
            next(action)
        }
    }
}