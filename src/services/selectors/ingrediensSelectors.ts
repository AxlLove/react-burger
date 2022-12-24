import {createSelector} from '@reduxjs/toolkit'
import {IIngredient} from '../../types/types';
import {RootState} from '../store';
import {array} from "prop-types";

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

export const feedSelector = (feed: Array<string> | undefined) => createSelector(getIngredientsSelector, (getIngredientsSelector) => {
    if (feed) {
        return feed.reduce<Array<IIngredient>>((arr, current) => {
            const item = getIngredientsSelector.find((item) => item._id === current)
            if (item) {
                arr.push(item);
            }
            return arr;
        }, [])
    }
});
export const feedPriceSelector = (feed: Array<string> | undefined) => createSelector(getIngredientsSelector, (getIngredientsSelector) => {
    if (feed) {
        return feed.reduce<number>((acc, current) => {
            const item = getIngredientsSelector.find((item) => item._id === current)
            if (item) {
                acc += item.price
            }
            return acc;
        }, 0)
    }
});

type TCount = IIngredient & { counter: number }
export const count = (feed: Array<string> | undefined) => createSelector(getIngredientsSelector, (getIngredientsSelector) => {
    if (feed) {
        const item = getIngredientsSelector.filter(ingredient => !!feed.find(id => id === ingredient._id))
        return item.reduce<Array<TCount>>((acc, ingredient) => {
            const counter = feed.filter(id => ingredient._id === id).length
            acc.push({...ingredient, counter})
            return acc
        }, [])
    }
});



