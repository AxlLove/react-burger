import reducer, {fetchIngredients} from "../slices/IngerdientSlice"
import {ingredientWithoutID} from "./mocks";


global.fetch = jest.fn()

const mockFetch = global.fetch as any

const initialState = {
    ingredientData: [],
    onLoad: false,
    onError: false,
};

describe('ingredientSlice', () => {
    it('should change status with fetchIngredients.pending action', ()=> {
        const state = reducer(initialState, fetchIngredients.pending)
        expect(state.onLoad).toBe(true)
        expect(state.onError).toBe(false)
    })
    it('should change status with fetchIngredients.fulfilled action', ()=> {
        const state = reducer(initialState, fetchIngredients.fulfilled({data: [ingredientWithoutID]}, fetchIngredients.fulfilled.type))
        console.log(state)
        expect(state).toEqual({
            ingredientData: [ingredientWithoutID],
            onLoad: false,
            onError: false,
        })
    })
    it('should change status with fetchIngredients.rejected action', ()=> {
        const state = reducer(initialState, fetchIngredients.rejected)
        expect(state.onLoad).toBe(false)
        expect(state.onError).toBe(true)
    })
});

describe('fetchIngredientThunk', () => {
    afterEach(() => {
        jest.resetAllMocks()
    })

    it('should getIngredient with resolve response', async () => {
        mockFetch.mockResolvedValue({
            json: () => Promise.resolve({data: [ingredientWithoutID]}),
            ok: true
        })

        const dispatch = jest.fn();
        const thunk = fetchIngredients();

        await thunk(dispatch, () => {
        }, {})

        const {calls} = dispatch.mock

        const [start, end] = calls


        expect(calls).toHaveLength(2)
        expect(start[0].type).toBe('ingredients/fetchIngredients/pending')
        expect(end[0].type).toBe('ingredients/fetchIngredients/fulfilled')
        expect(end[0].payload).toEqual({data: [ingredientWithoutID]})
    })
    it('should getIngredient with rejected response', async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            json: () => Promise.reject({message: 'errMessage'}),
        })

        const dispatch = jest.fn();

        const thunk = fetchIngredients();

        await thunk(dispatch, () => {
        }, {})

        const {calls} = dispatch.mock

        const [start, end] = calls

        expect(calls).toHaveLength(2)
        expect(start[0].type).toBe('ingredients/fetchIngredients/pending')
        expect(end[0].type).toBe('ingredients/fetchIngredients/rejected')
        expect(end[0].meta.rejectedWithValue).toBe(true)
        expect(end[0].payload).toBe('errMessage')
    })
});