import {createSlice} from "@reduxjs/toolkit";


const sliceName = 'info'

const initialState = {
    ingredient: null,
};


export const ingredientInfoSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        addIngredientInfo: (state, action) => {
            state.ingredient = action.payload
        },
        deleteIngredientInfo: (state, action) => {
            state.ingredient = null
        },
    },
})
const {reducer} = ingredientInfoSlice;

export default reducer