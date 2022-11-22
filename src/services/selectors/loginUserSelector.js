export const loginRequestSelector = (store) => ({
    onLoad: store?.userLogin?.onLoad,
    onError:store?.userLogin?.onError,
    errorMessage: store?.userLogin?.errorMessage
})