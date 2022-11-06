export const updateUserRequestSelector = (store) => ({
    onLoad: store?.updateUser?.onLoad,
    onError:store?.updateUser?.onError,
    errorMessage: store?.updateUser?.errorMessage
})