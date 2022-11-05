export const registerRequestSelector = (store) => ({
    onLoad: store?.userRegister?.onLoad, 
    onError:store?.userRegister?.onError, 
    errorMessage: store?.userRegister?.errorMessage
})