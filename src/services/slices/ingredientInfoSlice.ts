import {createSlice} from "@reduxjs/toolkit";
import {IIngredient} from "../../types/types";


const sliceName = 'info'

interface IIngredientInfoSlice {
    ingredient: IIngredient | null;
}
const initialState: IIngredientInfoSlice  = {
    ingredient: null,
};


export const ingredientInfoSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        addIngredientInfo: (state, action) => {
            state.ingredient = action.payload
        },
        deleteIngredientInfo: (state) => {
            state.ingredient = null
        },
    },
})
const {reducer} = ingredientInfoSlice;
export const {addIngredientInfo, deleteIngredientInfo} = ingredientInfoSlice.actions
export default reducer