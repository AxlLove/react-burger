import reducer, {fetchOrder} from "../slices/orderSlice"
import {ingredientWithoutID, orderInfoMock} from "./mocks";



global.fetch = jest.fn()

const mockFetch = global.fetch as any
const dispatch = jest.fn();
const thunk = fetchOrder({ingredients: ['213']});


const initialState = {
    orderDetails: null,
    onLoad: false,
    onError: false,
    errorMessage: ''
};

describe('getUser', () => {
    it('should change status with fetchOrder.pending action', ()=> {
        const state = reducer(initialState, fetchOrder.pending)
        expect(state.onLoad).toBe(true)
        expect(state.onError).toBe(false)
    })
    it('should change status with fetchOrder.fulfilled action', ()=> {
        const state = reducer(initialState, fetchOrder.fulfilled({success: true, order: {...orderInfoMock, price: 22, ingredients: [ingredientWithoutID]}, name: '404'}, fetchOrder.fulfilled.type, {ingredients: ['213']}))
        expect(state).toEqual({
            orderDetails: {success: true, order: {...orderInfoMock, price: 22, ingredients: [ingredientWithoutID]}, name: '404'},
            onLoad: false,
            onError: false,
            errorMessage: ''
        })
    })
    it('should change status with fetchOrder.rejected action', ()=> {
        const state = reducer(initialState, fetchOrder.rejected(null, '', {ingredients: ['123']}, 'some error', ))
        expect(state).toEqual({
            orderDetails: null,
            onLoad: false,
            onError: true,
            errorMessage: 'some error'
        })
    })
});

describe('fetchOrderThunk', () => {
    afterEach(() => {
        jest.resetAllMocks()
    })

    it('should fetchOrder with resolve response', async () => {
        mockFetch.mockResolvedValue({
            json: () => Promise.resolve({success: true, order: {...orderInfoMock, price: 22, ingredients: [ingredientWithoutID]}, name: '404'}),
            ok: true
        })

        const dispatch = jest.fn();
        const thunk = fetchOrder({ingredients: ['123']});

        await thunk(dispatch, () => {
        }, {})

        const {calls} = dispatch.mock

        const [start, end] = calls

        expect(calls).toHaveLength(2)
        expect(start[0].type).toBe('order/fetchOrder/pending')
        expect(end[0].type).toBe('order/fetchOrder/fulfilled')
        expect(end[0].payload).toEqual({success: true, order: {...orderInfoMock, price: 22, ingredients: [ingredientWithoutID]}, name: '404'})
    })

    it('fetchOrder should trigger refreshToken when err message "jwt expired"', async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            json: () => Promise.reject({message: 'jwt expired'}),
        })

        await thunk(dispatch, () => {
        }, {})

        const {calls} = dispatch.mock

        const [start, end] = calls

        expect(calls).toHaveLength(2)
        expect(start[0].type).toBe('order/fetchOrder/pending')
        expect(end[0].type).toBe('order/fetchOrder/rejected')
        expect(end[0].meta.rejectedWithValue).toBe(false)
        expect(mockFetch.mock.lastCall[0]).toBe('https://norma.nomoreparties.space/api/auth/token')
    })

    it('fetchOrder should getUSer with rejected response', async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            json: () => Promise.reject({message: 'some error'}),
        })


        await thunk(dispatch, () => {
        }, {})

        const {calls} = dispatch.mock

        const [start, end] = calls

        expect(calls).toHaveLength(2)
        expect(start[0].type).toBe('order/fetchOrder/pending')
        expect(end[0].type).toBe('order/fetchOrder/rejected')
        expect(end[0].meta.rejectedWithValue).toBe(true)
        expect(end[0].payload).toBe('some error')
    })
});