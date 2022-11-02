import {createSelector} from '@reduxjs/toolkit'

const selectOtherIngredient = store => store?.burgerConstructor?.constructorData
const selectBun = store => store?.burgerConstructor?.bun
export const getIngredientsSelector = (store) => store?.ingredients?.ingredientData;
export const ingredientDataLoadSelector = (store) => store.ingredients.onLoad;

export const counterSelector = (card) => createSelector(selectBun, selectOtherIngredient, (selectBun, selectOtherIngredient) => {

        if (!selectBun && !selectOtherIngredient) {
            return undefined
        }
        const data = [selectBun, ...selectOtherIngredient, selectBun]
        let counter = 0
        data.forEach((item) => card.name === item.name && counter++)
        return counter
    }
)


//TODO можно заменить методом reduce

