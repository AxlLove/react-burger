import {createSlice} from "@reduxjs/toolkit";
import {fetchIngredients} from "./IngerdientSlice";
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
            if(!action.payload) {
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
            const index = state.constructorData.findIndex(item=> item.dragId === id)
            state.constructorData.splice(index, 1)
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchIngredients.fulfilled, (state, action)=>{
            state.bun = action.payload.bun
        })
    }
})
const {reducer} = constructorSlice;

export default reducer