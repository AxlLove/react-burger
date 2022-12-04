import {createSelector} from '@reduxjs/toolkit'
import { IIngredient } from '../../types/types';
import { RootState } from '../store';

const selectOtherIngredient = (store: RootState) => store?.burgerConstructor?.constructorData
const selectBun = (store: RootState) => store?.burgerConstructor?.bun
export const getIngredientsSelector = (store: RootState) => store?.ingredients?.ingredientData;
export const ingredientDataLoadSelector = (store: RootState) => store.ingredients.onLoad;

export const counterSelector = (card: IIngredient) => createSelector(selectBun, selectOtherIngredient, (selectBun, selectOtherIngredient) => {
        if (!selectBun && !selectOtherIngredient) {
            return undefined
        }
        const data = [selectBun, ...selectOtherIngredient, selectBun]
        let counter = 0
        data.forEach((item) => card.name === item?.name && counter++)
        return counter
    }
)


//TODO можно заменить методом reduce

