import { RootState } from "../store";

export const getUserLoadSelector = (store: RootState) => store?.getUser.onLoad