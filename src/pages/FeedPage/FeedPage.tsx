import React, {useEffect} from "react";
import styles from './FeedPage.module.css';
import {useAppDispatch, useAppSelector} from "../../services/hooks/hooks";
import {connect, deleteOrderData, disconnect} from "../../services/slices/feedSlice";
import { WS_URL_ALL_ORDERS } from "../../utils/constants";
import { feedDataSelector } from "../../services/selectors/feedSelector";
import FeedOrderList from "../../components/FeedOrderList/FeedOrderList";
import OrderStatuses from "../../components/OrderStatuses/OrderStatuses";


const FeedPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const data = useAppSelector(feedDataSelector)

    useEffect(()=> {
        dispatch(connect(WS_URL_ALL_ORDERS))
        return () => {
            dispatch(disconnect())
            dispatch(deleteOrderData())
        }
    },[dispatch])

    return (
        <main className={styles.feed}>
            <div className={styles.content}>
                <h2 className={`text text_type_main-large pt-10`}>Лента заказов</h2>
                <div className={styles.columns}>
                    <FeedOrderList orders={data?.orders}/>
                    <OrderStatuses total={data?.total} totalToday={data?.totalToday}/>
                </div>
            </div>
        </main>
    )
}

export default FeedPage;