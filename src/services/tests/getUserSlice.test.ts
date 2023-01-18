import reducer, {getUser} from "../slices/getUserSlice"
import {userMock} from "./mocks";


global.fetch = jest.fn()
const mockFetch = global.fetch as any
const dispatch = jest.fn();
const thunk = getUser();


const initialState = {
    onLoad: false,
    onError: false,
    errorMessage: ''
};

describe('getUser', () => {
    it('should change status with getUser.pending action', ()=> {
        const state = reducer(initialState, getUser.pending)
        expect(state.onLoad).toBe(true)
        expect(state.onError).toBe(false)
    })
    it('should change status with getUser.fulfilled action', ()=> {
        const state = reducer(initialState, getUser.fulfilled({success: true, user:{email: 'some-email', name: 'some-name'}}, getUser.fulfilled.type))
        expect(state).toEqual({
            onLoad: false,
            onError: false,
            errorMessage: '',
        })
    })
    it('should change status with getUser.rejected action', ()=> {
        const state = reducer(initialState, getUser.rejected)
        expect(state.onLoad).toBe(false)
        expect(state.onError).toBe(true)
    })
});

describe('getUserThunk', () => {
    afterEach(() => {
        jest.resetAllMocks()
    })

    it('should getUSer with resolve response', async () => {
        mockFetch.mockResolvedValue({
            json: () => Promise.resolve({user: userMock}),
            ok: true
        })


        await thunk(dispatch, () => {
        }, {})

        const {calls} = dispatch.mock

        const [start, end] = calls


        expect(calls).toHaveLength(2)
        expect(start[0].type).toBe('getUser/getUser/pending')
        expect(end[0].type).toBe('getUser/getUser/fulfilled')
        expect(end[0].payload).toEqual({user: userMock})
    })
    
    it('should trigger refreshToken when err message "jwt expired"', async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            json: () => Promise.reject({message: 'jwt expired'}),
        })

        await thunk(dispatch, () => {
        }, {})

        const {calls} = dispatch.mock

        const [start, end] = calls

        expect(calls).toHaveLength(2)
        expect(start[0].type).toBe('getUser/getUser/pending')
        expect(end[0].type).toBe('getUser/getUser/rejected')
        expect(end[0].meta.rejectedWithValue).toBe(false)
        expect(mockFetch.mock.lastCall[0]).toBe('https://norma.nomoreparties.space/api/auth/token')
    })

    it('should getUSer with rejected response', async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            json: () => Promise.reject({message: 'some error'}),
        })


        await thunk(dispatch, () => {
        }, {})

        const {calls} = dispatch.mock

        const [start, end] = calls

        expect(calls).toHaveLength(2)
        expect(start[0].type).toBe('getUser/getUser/pending')
        expect(end[0].type).toBe('getUser/getUser/rejected')
        expect(end[0].meta.rejectedWithValue).toBe(true)
        expect(end[0].payload).toBe('some error')
    })
});