import { RootState } from "../store";

export const orderDataSelector = (store: RootState) => {
    const data = [store.burgerConstructor.bun, ...store.burgerConstructor.constructorData, store.burgerConstructor.bun]
        const dataId = data.map(item => item && item._id) as Array<string>
        return {ingredients: dataId}
}
export const constructorSubmitOrderSelector = (store: RootState) => ({onLoad: store?.order?.onLoad, onError: store?.order?.onError});

export const orderNumberSelector = (store: RootState) => store.order?.orderDetails?.order?.number