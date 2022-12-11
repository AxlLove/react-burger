import React, { useEffect } from "react";
import styles from './FeedOrderDetails.module.css'
import {useAppDispatch, useAppSelector} from "../../services/hooks/hooks";
import {feedPriceSelector, feedSelector} from "../../services/selectors/ingrediensSelectors";
import {FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import PriceWithCurrentIcon from "../PriceWithCurrentIcon/PriceWithCurrentIcon";
import IngredientIcon from "../IngredientIcon/IngredientIcon";
import { useParams } from "react-router-dom";
import { fetchGetOrderByNumber } from "../../services/slices/orderInfoSlice";
import { feedOrderInfo } from "../../services/selectors/feedOrderInfoSelector";
import { ordersStatuses, OrderStatus } from "../../utils/constants";
import {v4 as uiv4} from 'uuid'
//TODO заказ
interface IFeedOrderDetailst {
    withPage?: boolean;
}
const FeedOrderDetails: React.FC<IFeedOrderDetailst> = ({withPage})=> {
    const dispatch = useAppDispatch()
    const params: {identifier: string} = useParams()
    const { identifier } = params
    const order = useAppSelector(feedOrderInfo)
    const arr =  useAppSelector(feedSelector(order?.ingredients))
    const price = useAppSelector(feedPriceSelector(order?.ingredients))
    useEffect(()=> {
        dispatch(fetchGetOrderByNumber(Number(identifier)))
    }, [dispatch, identifier])
//TODO Написать логику анмаунта
    return (
        <div className={styles.feedOrderDetails}>
            <h2 className={`text text_type_digits-default ${withPage && styles.withPage}`}>#{order?.number}</h2>
            <p className={`text text_type_main-medium mt-10`}>{order?.name}</p>
            <p className={`text text_type_main-small mt-3 ${order?.status === ordersStatuses.done ? styles.statusDone : ''}`}>
                {order?.status===ordersStatuses.done ?
                 OrderStatus.DONE: order?.status===ordersStatuses.pending?
                  OrderStatus.PENDING:
                   OrderStatus.DONE}
                </p>
            <p className={`text text_type_main-medium mt-15`}>Состав</p>
            <ul className={`${styles.ingredientList} mt-6`}>
                {arr && arr.map(item => (
                        <li className={styles.ingredient} key={uiv4()}>
                            <div className={styles.ingredientContainer}>
                                <IngredientIcon name={item.name} image={item.image_mobile}/>
                                <p>{item.name}</p>
                            </div>
                                <PriceWithCurrentIcon price={item.type !== 'bun'? `${item.price}`: `2 x ${item.price}`}/>
                        </li>
                ))}
            </ul>
            <div className={`${styles.dateContainer} mt-10`}>
                {order && <FormattedDate className={`${styles.date} text text_type_main-default text_color_inactive`} date={new Date(order.createdAt)}/>}
                <PriceWithCurrentIcon price={price}/>
            </div>
        </div>
    )
}

export default FeedOrderDetails;
