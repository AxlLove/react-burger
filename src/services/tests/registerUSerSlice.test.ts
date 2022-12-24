import reducer, {registerUser} from "../slices/registerUserSlice"
import {successfullAuthMock} from "./mocks";


global.fetch = jest.fn()

const mockFetch = global.fetch as any

const initialState = {
    onLoad: false,
    onError: false,
    errorMessage: ''
};

describe('loginUserSlice', () => {
    it('should change status with registerUser.pending action', ()=> {
        const state = reducer(initialState, registerUser.pending)
        expect(state.onLoad).toBe(true)
        expect(state.onError).toBe(false)
    })

    it('should change status with registerUser.fulfilled action', ()=> {
        const state = reducer(initialState, registerUser.fulfilled)

        expect(state).toEqual({
            onLoad: false,
            onError: false,
            errorMessage: '',
        })
    })

    it('should change status with registerUser.rejected action', ()=> {
        const state = reducer(initialState, registerUser.rejected(null, '', {email: '', password: '', name: ''}, 'errr', ))
        expect(state.onLoad).toBe(false)
        expect(state.onError).toBe(true)
        expect(state.errorMessage).toBe('Произошла ошибка, попробуйте еще раз!')
    })

    it('should change status with registerUser.rejected action with incorrect user data', ()=> {
        const state = reducer(initialState, registerUser.rejected(null, '', {email: '', password: '', name: ''}, 'User already exists', ))
        expect(state.onLoad).toBe(false)
        expect(state.onError).toBe(true)
        expect(state.errorMessage).toBe('Такой пользователь уже зарегестрирован!')
    })
});

describe('registerUserThunk', () => {
    afterEach(() => {
        jest.resetAllMocks()
    })

    it('should registerUser with resolve response', async () => {
        mockFetch.mockResolvedValue({
            json: () => Promise.resolve(successfullAuthMock),
            ok: true
        })

        const dispatch = jest.fn();
        const thunk = registerUser({email: 'some@email', password: 'some-password', name: 'some-name'});

        await thunk(dispatch, () => {
        }, {})

        const {calls} = dispatch.mock

        const [start, end] = calls

        expect(calls).toHaveLength(2)
        expect(start[0].type).toBe('registerUser/register/pending')
        expect(end[0].type).toBe('registerUser/register/fulfilled')
        expect(end[0].payload).toEqual(successfullAuthMock)
    })

    it('should registerUser with rejected response', async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            json: () => Promise.reject({message: 'User already exists'}),
        })

        const dispatch = jest.fn();

        const thunk = registerUser({email: 'some@email', password: 'some-password', name: 'some-name'});

        await thunk(dispatch, () => {
        }, {})

        const {calls} = dispatch.mock

        const [start, end] = calls

        expect(calls).toHaveLength(2)
        expect(start[0].type).toBe('registerUser/register/pending')
        expect(end[0].type).toBe('registerUser/register/rejected')
        expect(end[0].meta.rejectedWithValue).toBe(true)
        expect(end[0].payload).toBe('User already exists')
    })
});