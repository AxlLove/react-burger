import { RootState } from "../store";

export const registerRequestSelector = (store: RootState) => ({
    onLoad: store?.userRegister?.onLoad, 
    onError:store?.userRegister?.onError, 
    errorMessage: store?.userRegister?.errorMessage
})