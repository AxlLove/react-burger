import {createSlice} from "@reduxjs/toolkit";
const sliceName = 'constructor'


const initialState = {
    constructorData: [],
    bun: null,
};

export const constructorSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        addIngredientToCart: (state, action) => {
            if (!action.payload) {
                return;
            }
            if (action.payload.type === 'bun') {
                state.bun = action.payload
                return
            }
            state.constructorData.push(action.payload)

        },
        updateIngredientsInConstructor: (state, action) => {
            state.constructorData = action.payload
        },
        deleteIngredient: (state, id) => {
            const index = state.constructorData.findIndex(item => item.dragId === id)
            state.constructorData.splice(index, 1)
        },
    },
})
const {reducer} = constructorSlice;

export default reducer