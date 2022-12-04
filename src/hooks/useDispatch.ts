import {useDispatch as dispatchHook} from "react-redux";
import {AppDispatch} from "../services/store";

export const useDispatch = () => dispatchHook<AppDispatch>