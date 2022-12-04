import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {getIngredients} from "../../utils/Api";
import {IIngredient} from "../../types/types";


interface IIngredientsSlice {
    ingredientData: Array<IIngredient>;
    onLoad: boolean;
    onError: boolean;
}
const sliceName = 'ingredients'
const initialState: IIngredientsSlice = {
    ingredientData: [],
    onLoad: false,
    onError: false,
};

export const fetchIngredients = createAsyncThunk(`${sliceName}/fetchIngredients`, async function () {
        return await
            getIngredients().then(res => {
                console.log(res)
                return {
                    data: res.data
                }
            })
                .catch((res) => {
                    throw new Error(`Ошибка ${res}`)
                })
    }
)


export const ingredientSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchIngredients.pending, state => {
            state.onLoad = true;
            state.onError = false
        })
            .addCase(fetchIngredients.fulfilled, (state, action)=> {
                state.onLoad = false;
                state.ingredientData = action.payload.data
            })
            .addCase(fetchIngredients.rejected, (state)=> {
                state.onLoad = false;
                state.onError = true
            })
    }
})
const {reducer} = ingredientSlice;

export default reducer
