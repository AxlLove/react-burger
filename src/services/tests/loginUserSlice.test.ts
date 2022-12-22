import reducer, {loginUser} from "../slices/loginUserSlice"
import {successfullAuthMock} from "./mocks";


global.fetch = jest.fn()

const mockFetch = global.fetch as any

const initialState = {
    onLoad: false,
    onError: false,
    errorMessage: ''
};

describe('loginUserSlice', () => {
    it('should change status with loginUser.pending action', ()=> {
        const state = reducer(initialState, loginUser.pending)
        expect(state.onLoad).toBe(true)
        expect(state.onError).toBe(false)
    })

    it('should change status with loginUser.fulfilled action', ()=> {
        const state = reducer(initialState, loginUser.fulfilled)

        expect(state).toEqual({
            onLoad: false,
            onError: false,
            errorMessage: '',
        })
    })

    it('should change status with loginUser.rejected action', ()=> {
        const state = reducer(initialState, loginUser.rejected(null, '', {email: '', password: ''}, 'errr', ))
        expect(state.onLoad).toBe(false)
        expect(state.onError).toBe(true)
        expect(state.errorMessage).toBe('Произошла ошибка, попробуйте еще раз!')
    })

    it('should change status with loginUser.rejected action with incorrect user data', ()=> {
        const state = reducer(initialState, loginUser.rejected(null, '', {email: '', password: ''}, 'email or password are incorrect', ))
        expect(state.onLoad).toBe(false)
        expect(state.onError).toBe(true)
        expect(state.errorMessage).toBe('E-mail или пароль введены неверно!')
    })
});

describe('loginUserThunk', () => {
    afterEach(() => {
        jest.resetAllMocks()
    })

    it('should loginUser with resolve response', async () => {
        mockFetch.mockResolvedValue({
            json: () => Promise.resolve(successfullAuthMock),
            ok: true
        })

        const dispatch = jest.fn();
        const thunk = loginUser({email: 'some@email', password: 'some-password'});

        await thunk(dispatch, () => {
        }, {})

        const {calls} = dispatch.mock

        const [start, end] = calls

        expect(calls).toHaveLength(2)
        expect(start[0].type).toBe('loginUser/login/pending')
        expect(end[0].type).toBe('loginUser/login/fulfilled')
        expect(end[0].payload).toEqual(successfullAuthMock)
    })
    
    it('should loginUser with rejected response', async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            json: () => Promise.reject({message: 'email or password are incorrect'}),
        })

        const dispatch = jest.fn();

        const thunk = loginUser({email: 'some@email', password: 'some-password'});

        await thunk(dispatch, () => {
        }, {})

        const {calls} = dispatch.mock

        const [start, end] = calls

        expect(calls).toHaveLength(2)
        expect(start[0].type).toBe('loginUser/login/pending')
        expect(end[0].type).toBe('loginUser/login/rejected')
        expect(end[0].meta.rejectedWithValue).toBe(true)
        expect(end[0].payload).toBe('email or password are incorrect')
    })
});