import React, {useEffect} from "react";
import styles from './FeedOrderDetails.module.css'
import {useAppDispatch, useAppSelector} from "../../services/hooks/hooks";
import {count, feedPriceSelector} from "../../services/selectors/ingrediensSelectors";
import {FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import PriceWithCurrentIcon from "../PriceWithCurrentIcon/PriceWithCurrentIcon";
import IngredientIcon from "../IngredientIcon/IngredientIcon";
import {useParams} from "react-router-dom";
import {deleteFeedOrderInfo, fetchGetOrderByNumber} from "../../services/slices/orderInfoSlice";
import {feedOrderInfo} from "../../services/selectors/feedOrderInfoSelector";
import {OrderResponseStatus} from "../../utils/constants";
import {v4 as uiv4} from 'uuid'
import {checkResponseStatus} from "../../utils/checkResponse";


interface IFeedOrderDetails {
    withPage?: boolean;
}

const FeedOrderDetails: React.FC<IFeedOrderDetails> = ({withPage}) => {
    const dispatch = useAppDispatch()
    const params: { identifier: string } = useParams()
    const {identifier} = params
    const order = useAppSelector(feedOrderInfo)
    const price = useAppSelector(feedPriceSelector(order?.ingredients))
    const obj = useAppSelector(count(order?.ingredients))

    useEffect(() => {
        dispatch(fetchGetOrderByNumber(Number(identifier)))
        return () => {
            dispatch(deleteFeedOrderInfo())
        }
    }, [dispatch, identifier])

    return (
        <div className={styles.feedOrderDetails}>
            <h2 className={`text text_type_digits-default ${withPage && styles.withPage}`}>#{order?.number}</h2>
            <p className={`text text_type_main-medium mt-10`}>{order?.name}</p>
            <p className={`text text_type_main-small mt-3 ${order?.status === OrderResponseStatus.DONE ? styles.statusDone : ''}`}>
                {checkResponseStatus(order?.status)}
            </p>
            <p className={`text text_type_main-medium mt-15`}>Состав</p>
            <ul className={`${styles.ingredientList} mt-6`}>
                {obj && obj.map(item => (
                    <li className={styles.ingredient} key={uiv4()}>
                        <div className={styles.ingredientContainer}>
                            <IngredientIcon name={item.name} image={item.image_mobile}/>
                            <p>{item.name}</p>
                        </div>
                        <PriceWithCurrentIcon price={`${item.counter}x${item.price}`}/>
                    </li>
                ))}
            </ul>
            <div className={`${styles.dateContainer} mt-10`}>
                {order && <FormattedDate className={`${styles.date} text text_type_main-default text_color_inactive`}
                                         date={new Date(order.createdAt)}/>}
                <PriceWithCurrentIcon price={price}/>
            </div>
        </div>
    )
}

export default FeedOrderDetails;
