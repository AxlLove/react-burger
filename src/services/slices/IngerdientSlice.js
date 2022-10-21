import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {getIngredients, makeAnOrder} from "../../utils/Api";

const sliceName = 'ingredients'

const initialState = {
    ingredientData: [],
    constructorData: [],
    bun: null,
    ingredient: null,
    onLoad: false,
    onError: false,
    orderDitails: null,
    onLoadOrder: false,
    onErrorOrder: false,
};

export const fetchIngredients = createAsyncThunk(`${sliceName}/fetchIngredients`,async function ()  {
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

export const fetchOrder = createAsyncThunk(`${sliceName}/fetchOrder`, async function (orderData)  {
    return await
    makeAnOrder(orderData).then(res => {
            return res
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
        //TODO естовый редьюсер
        addIngredientToCart: (state, action) => {
            if (action.payload.type === 'bun') {
                state.bun = action.payload
                return
            }
            state.constructorData.push(action.payload)
        },
        addIngredientInfo: (state, action) => {
            state.ingredient = action.payload
        },
        deleteIngredientInfo: (state, action) => {
            state.ingredient = null
        }

    },
    extraReducers: {
        [fetchIngredients.pending]: (state, action) => {state.onLoad=true; state.onError = false},
        [fetchIngredients.fulfilled]: (state, action) => {
            state.onLoad=false;
            state.ingredientData = action.payload.data
            state.bun = action.payload.bun
            },
        [fetchIngredients.rejected]: (state, action) => {state.onLoad=false; state.onError = true},

        [fetchOrder.pending]: (state, action) => {state.onLoadOrder=true; state.onErrorOrder = false},
        [fetchOrder.fulfilled]: (state, action) => {
            state.onLoadOrder=false;
            state.orderDitails = action.payload
            },
        [fetchOrder.rejected]: (state, action) => {state.onLoadOrder=false; state.onErrorOrder = true},
    }
})
const {reducer} = ingredientSlice;

export default reducer
