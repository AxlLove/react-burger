import { RootState } from "../store"
export const feedOrderInfo = (store: RootState)=> {
    if (store.orderInfo.orderInfo.orders !== null) {
        return store.orderInfo.orderInfo.orders[0]
    }
        
}