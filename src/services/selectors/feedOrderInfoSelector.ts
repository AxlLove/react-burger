import { RootState } from "../store"
export const feedOrderInfo = (store: RootState)=> {
        return store?.orderInfo?.orderInfo?.orders[0]

}