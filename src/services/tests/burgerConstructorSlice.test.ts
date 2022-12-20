import reducer, {deleteIngredient, updateIngredientsInConstructor, addIngredientToCart} from '../slices/burgerConstructorSlice'
import {bunWithId, ingredientWithID} from "./mocks";

describe('burgerConstructorSlice', ()=> {
    it('should return default state an empty action', ()=> {
        const result = reducer(undefined, {type: ''})

        expect(result).toEqual({bun: null, constructorData: []})
    })
    it('should add ingredient to cart with "addIngredientToCart" action', ()=> {
        const actionWithBun = {type: addIngredientToCart.type, payload: bunWithId}
        const resultWithBun = reducer({bun: null, constructorData: []}, actionWithBun);

        const action = {type: addIngredientToCart.type, payload: ingredientWithID}
        const result = reducer({bun: null, constructorData: []}, action);

        expect(resultWithBun.bun).toEqual(bunWithId)
        expect(result.constructorData[0]).toEqual(ingredientWithID)
    })
    it('should update ingredient to cart with "updateIngredientsInConstructor" action', ()=> {
        const mock = [{...ingredientWithID, name: 'testName'}]

        const action = {type: updateIngredientsInConstructor.type, payload: mock}

        const result = reducer({bun: null, constructorData: [ingredientWithID]}, action)

        expect(result.constructorData).toEqual(mock)
    })
    it('should delete ingredient in cart with "deleteIngredient" action', ()=> {
        const action = {type: deleteIngredient.type, payload: ingredientWithID.dragId}

        const result = reducer({bun: null, constructorData: [ingredientWithID]}, action)
        
        expect(result.constructorData).toEqual([])
        })
    })