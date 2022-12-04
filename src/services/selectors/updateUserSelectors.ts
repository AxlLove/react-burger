import { RootState } from "../store";

export const updateUserRequestSelector = (store: RootState) => ({
    onLoad: store?.updateUser?.onLoad,
    onError:store?.updateUser?.onError,
    errorMessage: store?.updateUser?.errorMessage
})