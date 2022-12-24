import reducer, {addIngredientInfo, deleteIngredientInfo} from '../slices/ingredientInfoSlice'
import { ingredientWithoutID } from './mocks'
describe('ingredientInfoSlice', ()=> {
    it('should return default state an empty action', ()=> {
        const result = reducer(undefined, {type: ''})

        expect(result).toEqual({ingredient: null})
    })
    it('should add ingredient info to state with "addIngredientInfo" action', ()=> {
        const action = {type: addIngredientInfo.type, payload: ingredientWithoutID}
        const result = reducer({ingredient: null}, action);

        expect(result.ingredient).toEqual(ingredientWithoutID)
    })
    it('should delete ingredient info to state with "deleteIngredientInfo" action', ()=> {
        const action = {type: deleteIngredientInfo.type}
        const result = reducer({ingredient: ingredientWithoutID}, action);

        expect(result.ingredient).toBe(null)
    })
})