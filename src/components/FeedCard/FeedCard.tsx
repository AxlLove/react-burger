import React from "react";
import styles from './FeedCard.module.css'
import {useAppSelector} from "../../services/hooks/hooks";
import {feedPriceSelector, feedSelector} from "../../services/selectors/ingrediensSelectors";
import {FormattedDate} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, useLocation} from "react-router-dom";
import PriceWithCurrentIcon from "../PriceWithCurrentIcon/PriceWithCurrentIcon";
import IngredientIcon from "../IngredientIcon/IngredientIcon";
import {v4 as uiv4} from 'uuid'
import {OrderResponseStatus} from "../../utils/constants";
import {checkResponseStatus} from "../../utils/checkResponse";
import {TOrderResponseStatus} from "../../types/types";

type TStatus = OrderResponseStatus.DONE | OrderResponseStatus.PENDING | OrderResponseStatus.CREATED;

interface IFeedCard {
    identifier: number;
    date: string;
    name: string;
    ingredients: Array<string>,
    status?: TOrderResponseStatus,
}



const FeedCard: React.FC<IFeedCard> = ({identifier, date, name, ingredients, status}) => {
    const location = useLocation();
    const arr = useAppSelector(feedSelector(ingredients))
    const price = useAppSelector(feedPriceSelector(ingredients))

    return (
        <Link key={identifier}
              to={{
                  pathname: `${location.pathname}/${identifier}`,
                  state: {background: location},
              }}
              className={styles.link}>
            <li className={`${styles.card} pt-6 pb-6 pr-6 pl-6`}>
                <div className={`${styles.orderContainer}`}>
                    <p className={`${styles.identifier} text text_type_digits-default`}>#{identifier}</p>
                    <FormattedDate className={`${styles.date} text text_type_main-default text_color_inactive`}
                                   date={new Date(date)}/>
                </div>
                <h2 className={`${styles.header} text text_type_main-medium pt-6`}>{name}</h2>
                {status &&
                    <p className={`text text_type_main-small pt-2 ${status === OrderResponseStatus.DONE ? styles.statusDone : ''}`}>
                        {checkResponseStatus(status)}</p>}
                <div className={`${styles.ingredientContainer} pt-6`}>
                    <ul className={styles.ingredientIcons}>
                        {arr && arr.slice(0, 6).map((item, index) => (
                            index !== 5 ?
                                <IngredientIcon list={true} name={item.name} image={item.image_mobile} key={uiv4()}/>
                                : 
                                <IngredientIcon list={true} name={item.name} image={item.image_mobile}
                                                  withoutCount={false}
                                                  count={arr.length - 5} key={uiv4()}/>
                        )).reverse()}
                    </ul>
                    <PriceWithCurrentIcon price={price}/>

                </div>
            </li>
        </Link>

    )
}
export default FeedCard;