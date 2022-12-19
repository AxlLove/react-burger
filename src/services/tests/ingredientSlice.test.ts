import { fetchIngredients } from "../slices/IngerdientSlice"
import { ingredientWithoutID } from "./mocks";
import fetchMock from 'fetch-mock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { start } from "repl";
describe('ingredientSlice', ()=> {

});

describe('fetchIngredientThunk',()=> {
    it('shold getIngredient with resolve response', async () => {
        const mock = [ingredientWithoutID];
        const dispatch = jest.fn();
        const thunk = fetchIngredients();

        await thunk(dispatch, ()=>{}, {})
        console.log(dispatch.mock.calls)
        const [start, end] = dispatch.mock.calls
        console.log(start)
    })
});