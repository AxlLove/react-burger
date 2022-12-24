import {createSlice} from "@reduxjs/toolkit";
import {IIngredientWithUniqueId} from "../../types/types";
import {PayloadAction} from "@reduxjs/toolkit";


interface IConstructor {
    constructorData: Array<IIngredientWithUniqueId>;
    bun: IIngredientWithUniqueId | null;
}

const sliceName = 'constructor'
const initialState: IConstructor = {
    constructorData: [],
    bun: null,
};

export const constructorSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        addIngredientToCart: (state, action: PayloadAction<IIngredientWithUniqueId>) => {
            if (!action.payload) {
                return;
            }
            if (action.payload.type === 'bun') {
                state.bun = action.payload
                return
            }
            state.constructorData.push(action.payload)

        },
        updateIngredientsInConstructor: (state, action: PayloadAction<Array<IIngredientWithUniqueId>>) => {
            state.constructorData = action.payload
        },
        deleteIngredient: (state, action: PayloadAction<string>) => {
            const index = state.constructorData.findIndex(item => item?.dragId === action.payload)
            state.constructorData.splice(index, 1)
        },
    },
})

export const {deleteIngredient, updateIngredientsInConstructor, addIngredientToCart} = constructorSlice.actions;

const {reducer} = constructorSlice;

export default reducer