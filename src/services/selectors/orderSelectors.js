
export const orderDataSelector = (store) => {
    const data = [store?.burgerConstructor?.bun, ...store?.burgerConstructor?.constructorData, store?.burgerConstructor?.bun]
    const dataId = data.map(item => item?._id)
    return {ingredients: dataId}
}
export const constructorSubmitOrderSelector = (store) => ({onLoad: store?.order?.onLoad, onError: store?.order?.onError});