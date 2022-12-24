import reducer, {logoutUser} from "../slices/logoutUserSlice"
import {successfullAuthMock} from "./mocks";


global.fetch = jest.fn()

const mockFetch = global.fetch as any
const spyStorage = jest.spyOn(Storage.prototype, 'removeItem')
const initialState = {
    onLoad: false,
    onError: false,
    errorMessage: ''
};

describe('loginUserSlice', () => {
    it('should change status with logoutUser.pending action', ()=> {
        const state = reducer(initialState, logoutUser.pending)
        expect(state.onLoad).toBe(true)
        expect(state.onError).toBe(false)
    })

    it('should change status with logoutUser.fulfilled action', ()=> {
        const state = reducer(initialState, logoutUser.fulfilled)

        expect(state).toEqual({
            onLoad: false,
            onError: false,
            errorMessage: '',
        })
    })

    it('should change status with logoutUser.rejected action', ()=> {
        const state = reducer(initialState, logoutUser.rejected)
        expect(state.onLoad).toBe(false)
        expect(state.onError).toBe(true)
    })

});


describe('logoutUserThunk', () => {

    afterEach(() => {
        jest.resetAllMocks()
    })

    it('should logoutUser with resolve response', async () => {

        mockFetch.mockResolvedValue({
            json: () => Promise.resolve(successfullAuthMock),
            ok: true
        })

        const dispatch = jest.fn();
        const thunk = logoutUser();

        await thunk(dispatch, () => {
        }, {})

        const {calls} = dispatch.mock

        const [start, end] = calls

        expect(calls).toHaveLength(2)
        expect(start[0].type).toBe('logoutUser/logout/pending')
        expect(end[0].type).toBe('logoutUser/logout/fulfilled')
        expect(end[0].payload).toEqual(successfullAuthMock)
        expect(spyStorage).toHaveBeenCalled()
    })

    it('should loginUser with rejected response', async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            json: () => Promise.reject({message: 'some err'}),
        })

        const dispatch = jest.fn();

        const thunk = logoutUser();

        await thunk(dispatch, () => {
        }, {})

        const {calls} = dispatch.mock

        const [start, end] = calls

        expect(calls).toHaveLength(2)
        expect(start[0].type).toBe('logoutUser/logout/pending')
        expect(end[0].type).toBe('logoutUser/logout/rejected')
        expect(end[0].meta.rejectedWithValue).toBe(true)
        expect(end[0].payload).toBe('some err')
    })
});