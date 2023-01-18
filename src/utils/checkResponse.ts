import {OrderResponseStatus, OrderStatus} from "./constants";
import {TOrderResponseStatus} from "../types/types";

type TResult = OrderStatus.DONE | OrderStatus.PENDING | OrderStatus.CREATED | string | undefined

export const checkResponseStatus = (status: TOrderResponseStatus): TResult => {
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