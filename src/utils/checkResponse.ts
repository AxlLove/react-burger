import {OrderResponseStatus, OrderStatus} from "./constants";

type TStatus = OrderResponseStatus.DONE | OrderResponseStatus.PENDING | OrderResponseStatus.CREATED | undefined;
type TResult = OrderStatus.DONE | OrderStatus.PENDING | OrderStatus.CREATED | string | undefined

export const checkResponseStatus = (status: TStatus): TResult => {
    let res = ''
    if (status) {
        switch (status) {
            case OrderResponseStatus.DONE: {
                return res = OrderStatus.DONE
            }
            case OrderResponseStatus.PENDING: {
                return res = OrderStatus.PENDING
            }
            case OrderResponseStatus.CREATED: {
                return res = OrderStatus.CREATED
            }
            default: {
                return res
            }
        }
    }
}