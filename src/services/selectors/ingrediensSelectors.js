import { createSelector } from '@reduxjs/toolkit'

const selectOtherIngredient = store => store?.ingredients?.constructorData
const selectBun = store => store?.ingredients?.bun
export const getIngredientsSelector = (store) => store?.ingredients?.ingredientData;

export const ingredientDataLoadSelector = (store) => store.ingredients.onLoad;

export const constructorDataSelector = (store) => ({
    selectedBun: store.ingredients.bun,
    otherIngredients: store.ingredients.constructorData
})
export const constructorSubmitOrderSelector = (store) => ({
    onLoad: store.ingredients.onLoadOrder,
    onError: store.ingredients.onErrorOrder
});

export const orderDataSelector = (store) => {
    const data = [store?.ingredients?.bun, ...store?.ingredients?.constructorData, store?.ingredients?.bun]
    const dataId = data.map(item => item?._id)
    return {ingredients: dataId}
}

export const totalPriceSelector = createSelector(selectBun, selectOtherIngredient, (selectBun, selectOtherIngredient) => {
        const data = [selectBun, ...selectOtherIngredient, selectBun]
        return data.reduce((subtotal, item) => subtotal + item?.price, 0)
    }
)
