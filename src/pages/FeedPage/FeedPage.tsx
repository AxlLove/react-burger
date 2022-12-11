import React, {useEffect} from "react";
import styles from './FeedPage.module.css';
import {useAppDispatch, useAppSelector} from "../../services/hooks/hooks";
import {connect, disconnect} from "../../services/slices/feedSlice";
import { WS_URL_ALL_ORDERS } from "../../utils/constants";
import { feedDataSelector, feedStatus } from "../../services/selectors/feedSelector";
import FeedOrderList from "../../components/FeedOrderList/FeedOrderList";
import OrderStatuses from "../../components/OrderStatuses/OrderStatuses";
import Preloader from "../../components/Preloader/Preloader";
import { WebSocketStatus } from "../../types/types";


const FeedPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const data = useAppSelector(feedDataSelector)
    const connectStatus = useAppSelector(feedStatus)

    useEffect(()=> {
        dispatch(connect(WS_URL_ALL_ORDERS))
        return () => {
            dispatch(disconnect())
        }
    },[dispatch])
//TODO азвания классов - рука-лицо
    return (
        <main className={styles.feed}>
        {connectStatus !== WebSocketStatus.ONLINE? <Preloader style={{marginTop: '300px'}}/> :
            <div className={styles.content}>
                <h2 className={`text text_type_main-large pt-10`}>Лента заказов</h2>

                <div className={styles.columns}>
                    <FeedOrderList orders={data?.orders}/>
                    <OrderStatuses total={data?.total} totalToday={data?.totalToday}/>
                </div>
            </div>}
        </main>
    )
}

export default FeedPage;