import reducer, * as feed from '../slices/feedSlice'
import {WebSocketStatus} from "../../types/types";
import {getUser} from "../slices/getUserSlice";
import {wsClose, wsError, wsMessage} from "../slices/feedSlice";
import {orderInfoMock} from "./mocks";

const initialState = {
    status: WebSocketStatus.OFFLINE,
    connectingError: '',
    data: null,
}

describe('getUser', ()=> {
    it('should return default state an empty action', ()=> {
        const result = reducer(undefined, {type: ''})

        expect(result).toEqual(initialState)
    })
    it('should change status when wsConnecting action', ()=> {
        const action = {type: feed.wsConnecting.type}
        const result = reducer(initialState, action)
        expect(result.status).toBe(WebSocketStatus.CONNECTING)
    })
    it('should change status when wsOpen action', ()=> {
        const action = {type: feed.wsOpen.type}
        const result = reducer(initialState, action)
        expect(result.status).toBe(WebSocketStatus.ONLINE)
    })
    it('should change status when wsClose action', ()=> {
        const action = {type: feed.wsClose.type}
        const result = reducer(initialState, action)
        expect(result.status).toBe(WebSocketStatus.OFFLINE)
    })
    it('should change connectingError when wsError action', ()=> {
        const action = {type: feed.wsError.type, payload: 'some err'}
        const result = reducer(initialState, action)
        expect(result.connectingError).toBe('some err')
    })
    it('should add data when wsMessage action', ()=> {
        const action = {type: feed.wsMessage.type, payload: [orderInfoMock]}
        const result = reducer(initialState, action)
        expect(result.data).toEqual([orderInfoMock])
    })
    it('should remove data when deleteOrderData action', ()=> {
        const action = {type: feed.deleteOrderData.type}
        const result = reducer(initialState, action)
        expect(result.data).toBeNull()
    })
})