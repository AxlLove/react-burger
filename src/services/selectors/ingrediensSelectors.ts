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

export const feedSelector = (feed: Array<string>) => createSelector(getIngredientsSelector, (getIngredientsSelector)=> {
    return feed.reduce<Array<IIngredient>>((arr, current) => {
        const item = getIngredientsSelector.find((item)=> item._id === current)
        if (item) {
            arr.push(item);
        }
        return arr;
    }, [])
});
export const feedPriceSelector = (feed: Array<string>) => createSelector(getIngredientsSelector, (getIngredientsSelector)=> {
    return feed.reduce<number>((acc, current) => {
        const item = getIngredientsSelector.find((item)=> item._id === current)
        if (item) {
         item && item.type === 'bun'?  acc += item.price * 2: acc += item.price
        }
        return acc;
    }, 0)
});

//TODO разобраться как считаем булку
//TODO можно заменить методом reduce

