import { createSelector } from '@reduxjs/toolkit'

const selectOtherIngredient = store => store?.burgerConstructor?.constructorData
const selectBun = store => store?.burgerConstructor?.bun

export const totalPriceSelector = createSelector(selectBun, selectOtherIngredient, (selectBun, selectOtherIngredient) => {
        if(selectOtherIngredient) {
            const data = [selectBun, ...selectOtherIngredient, selectBun]
            return data.reduce((subtotal, item) => {
                if (!item) {
                    return subtotal
                }
               return  subtotal + item?.price
            }, 0)
        }
    }
)
export const constructorDataSelector = (store) => ({
    selectedBun: store.burgerConstructor.bun,
    otherIngredients: store.burgerConstructor.constructorData
})