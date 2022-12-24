import {useDispatch as dispatchHook, useSelector as selectorHook, TypedUseSelectorHook} from "react-redux";
import {AppDispatch,RootState} from "../store";

export const useAppDispatch = () => dispatchHook<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;