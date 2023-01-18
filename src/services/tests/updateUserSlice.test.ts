import reducer, {updateUserInfo} from "../slices/updateUserSlice"
import {successfullAuthMock} from "./mocks";


global.fetch = jest.fn()

const mockFetch = global.fetch as any

const initialState = {
    onLoad: false,
    onError: false,
    errorMessage: ''
};

describe('loginUserSlice', () => {
    it('should change status with updateUserInfo.pending action', ()=> {
        const state = reducer(initialState, updateUserInfo.pending)
        expect(state.onLoad).toBe(true)
        expect(state.onError).toBe(false)
    })

    it('should change status with updateUserInfo.fulfilled action', ()=> {
        const state = reducer(initialState, updateUserInfo.fulfilled)

        expect(state).toEqual({
            onLoad: false,
            onError: false,
            errorMessage: '',
        })
    })

    it('should change status with updateUserInfo.rejected action', ()=> {
        const state = reducer(initialState, updateUserInfo.rejected(null, '', {email: '', password: '', name: ''}, 'errr', ))
        expect(state.onLoad).toBe(false)
        expect(state.onError).toBe(true)
        expect(state.errorMessage).toBe('Произошла ошибка, попробуйте еще раз!')
    })

    it('should change status with updateUserInfo.rejected action with incorrect user data', ()=> {
        const state = reducer(initialState, updateUserInfo.rejected(null, '', {email: '', password: '', name: ''}, 'User with such email already exists', ))
        expect(state.onLoad).toBe(false)
        expect(state.onError).toBe(true)
        expect(state.errorMessage).toBe('Пользователь с данным E-mail уже зарегестрирован')
    })
});

describe('updateUserInfoThunk', () => {
    afterEach(() => {
        jest.resetAllMocks()
    })

    it('should updateUserInfo with resolve response', async () => {
        mockFetch.mockResolvedValue({
            json: () => Promise.resolve(successfullAuthMock),
            ok: true
        })

        const dispatch = jest.fn();
        const thunk = updateUserInfo({email: 'some@email', password: 'some-password', name: 'some-name'});

        await thunk(dispatch, () => {
        }, {})

        const {calls} = dispatch.mock

        const [start, end] = calls

        expect(calls).toHaveLength(2)
        expect(start[0].type).toBe('updateUser/update/pending')
        expect(end[0].type).toBe('updateUser/update/fulfilled')
        expect(end[0].payload).toEqual(successfullAuthMock)
    })

    it('should updateUserInfo with rejected response', async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            json: () => Promise.reject({message: 'User already exists'}),
        })

        const dispatch = jest.fn();

        const thunk = updateUserInfo({email: 'some@email', password: 'some-password', name: 'some-name'});

        await thunk(dispatch, () => {
        }, {})

        const {calls} = dispatch.mock

        const [start, end] = calls

        expect(calls).toHaveLength(2)
        expect(start[0].type).toBe('updateUser/update/pending')
        expect(end[0].type).toBe('updateUser/update/rejected')
        expect(end[0].meta.rejectedWithValue).toBe(true)
        expect(end[0].payload).toBe('User already exists')
    })
});