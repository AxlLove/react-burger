import { RootState } from "../store";

export const getWidthSelector = (store: RootState) => store.width.width > 800


