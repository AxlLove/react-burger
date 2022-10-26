import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {getIngredients, makeAnOrder} from "../../utils/Api";

const sliceName = 'ingredients'

const initialState = {
    ingredientData: [],
    onLoad: false,
    onError: false,
};

export const fetchIngredients = createAsyncThunk(`${sliceName}/fetchIngredients`, async function () {
        return await
            getIngredients().then(res => {
                return {
                    bun: res.data.find(item => item.type === 'bun'),
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
    reducers: {
        addIngredientToCart: (state, action) => {
            if (action.payload.type === 'bun') {
                state.bun = action.payload
                return
            }
            state.constructorData.push(action.payload)
        },
    },
    extraReducers:  {
        [fetchIngredients.pending]: (state, action) => {
            state.onLoad = true;
            state.onError = false
        },
        [fetchIngredients.fulfilled]: (state, action) => {
            state.onLoad = false;
            state.ingredientData = action.payload.data
        },
        [fetchIngredients.rejected]: (state, action) => {
            state.onLoad = false;
            state.onError = true
        },

    }
})
const {reducer} = ingredientSlice;

export default reducer
