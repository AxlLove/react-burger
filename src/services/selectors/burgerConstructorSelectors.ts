import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'
const selectOtherIngredient = (store: RootState) => store?.burgerConstructor?.constructorData
const selectBun = (store: RootState) => store?.burgerConstructor?.bun

export const totalPriceSelector = createSelector(selectBun, selectOtherIngredient, (selectBun, selectOtherIngredient) => {
            const data = [selectBun, ...selectOtherIngredient, selectBun]
            return data.reduce((subtotal, item) => item? subtotal + item?.price : subtotal, 0)
    }
)

export const constructorDataSelector = (store: RootState) => ({
    selectedBun: store.burgerConstructor.bun,
    otherIngredients: store.burgerConstructor.constructorData
})