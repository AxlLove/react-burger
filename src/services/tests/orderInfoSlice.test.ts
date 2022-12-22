import reducer, {fetchGetOrderByNumber, deleteFeedOrderInfo} from "../slices/orderInfoSlice"
import {ingredientWithoutID, orderInfoMock} from "./mocks";



global.fetch = jest.fn()
const mockFetch = global.fetch as any

const initialState = {
    orderInfo: null,
    onLoad: false,
    onError: false,
    errorMessage: ''
};

describe('orderInfoSlice', () => {
    it('should change status with fetchGetOrderByNumber.pending action', ()=> {
        const state = reducer(initialState, fetchGetOrderByNumber.pending)
        expect(state.onLoad).toBe(true)
        expect(state.onError).toBe(false)
    })

    it('should change status with fetchGetOrderByNumber.fulfilled action', ()=> {
        const state = reducer(initialState, fetchGetOrderByNumber.fulfilled({success: true, orders: [orderInfoMock]}, fetchGetOrderByNumber.fulfilled.type, 0))

        expect(state).toEqual({
            orderInfo: {success: true, orders: [orderInfoMock]},
            onLoad: false,
            onError: false,
            errorMessage: '',
        })
    })

    it('should change status with fetchGetOrderByNumber.rejected action', ()=> {
        const state = reducer(initialState, fetchGetOrderByNumber.rejected(null, '', 13, 'some err',))

        expect(state).toEqual({
            orderInfo: null,
            onLoad: false,
            onError: true,
            errorMessage: 'some err',
        })
    })
    it('should delete info with "deleteFeedOrderInfo" action', ()=> {
        const state = {
            orderInfo: {success: true, orders: [orderInfoMock]},
            onLoad: false,
            onError: false,
            errorMessage: ''
        };

        const action = {type: deleteFeedOrderInfo.type}
        const result = reducer(state, action);

        expect(result.orderInfo).toBe(null)
    })

});


describe('fetchGetOrderByNumberThunk', () => {

    afterEach(() => {
        jest.resetAllMocks()
    })

    it('should fetchGetOrderByNumber with resolve response', async () => {

        mockFetch.mockResolvedValue({
            json: () => Promise.resolve({success: true, orders: [orderInfoMock]}),
            ok: true
        })

        const dispatch = jest.fn();
        const thunk = fetchGetOrderByNumber(404);

        await thunk(dispatch, () => {
        }, {})

        const {calls} = dispatch.mock

        const [start, end] = calls

        expect(calls).toHaveLength(2)
        expect(start[0].type).toBe('orderInfo/fetchOrder/pending')
        expect(end[0].type).toBe('orderInfo/fetchOrder/fulfilled')
        expect(end[0].payload).toEqual({success: true, orders: [orderInfoMock]})
    })

    it('should fetchGetOrderByNumber with rejected response', async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            json: () => Promise.reject({message: 'some err'}),
        })

        const dispatch = jest.fn();

        const thunk = fetchGetOrderByNumber(404);

        await thunk(dispatch, () => {
        }, {})

        const {calls} = dispatch.mock

        const [start, end] = calls

        expect(calls).toHaveLength(2)
        expect(start[0].type).toBe('orderInfo/fetchOrder/pending')
        expect(end[0].type).toBe('orderInfo/fetchOrder/rejected')
        expect(end[0].meta.rejectedWithValue).toBe(true)
        expect(end[0].payload).toBe('some err')
    })
});