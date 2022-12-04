import { RootState } from "../store";

export const loginRequestSelector = (store: RootState) => ({
    onLoad: store?.userLogin?.onLoad,
    onError:store?.userLogin?.onError,
    errorMessage: store?.userLogin?.errorMessage
})