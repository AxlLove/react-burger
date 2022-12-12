import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {OrderResponseStatus} from "../../utils/constants";

export const feedDataSelector = (store: RootState) => store.feed?.data;
export const feedStatus = (store: RootState) => store.feed?.status;
export const feedOrderDoneSelector = createSelector(feedDataSelector, (feedDataSelector) => {
    return feedDataSelector?.orders.filter(item => item.status === OrderResponseStatus.DONE).reduce<Array<number>>((arr, item) => {
        if (item) {
            arr.push(item.number)
        }
        return arr
    }, [])
})

export const feedOrderPendingSelector = createSelector(feedDataSelector, (feedDataSelector) => {
    return feedDataSelector?.orders.filter(item => item.status === OrderResponseStatus.PENDING).reduce<Array<number>>((arr, item) => {
        if (item) {
            arr.push(item.number)
        }
        return arr
    }, [])
})

