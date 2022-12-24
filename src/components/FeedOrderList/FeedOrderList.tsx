import React from "react";
import styles from './FeedOrderList.module.css';
import FeedCard from "../../components/FeedCard/FeedCard";
import { IFeedOrder } from "../../types/types";

interface IFeedOrderList {
    orders: Array<IFeedOrder> | undefined
}
const FeedOrderList: React.FC<IFeedOrderList> = ({orders}) => {

    return (
        <ul className={`${styles.feedList}`}>
            {orders?.map((order)=>(
                <FeedCard identifier={order.number} date={order.createdAt} name={order.name} ingredients={order.ingredients} key={order.number}/>
            ))}
        </ul>
    )
}

export default FeedOrderList;
