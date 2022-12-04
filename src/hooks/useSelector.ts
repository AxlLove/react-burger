import {useSelector as selectorHook, TypedUseSelectorHook} from "react-redux";
import {RootState} from "../services/store";

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;