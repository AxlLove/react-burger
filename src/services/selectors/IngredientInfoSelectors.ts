import { RootState } from "../store";

export const getIngredientInfoSelector = (store: RootState)=> store?.info?.ingredient;