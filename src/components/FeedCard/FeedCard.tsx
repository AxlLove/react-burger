import React from "react";
import styles from './FeedCard.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppSelector} from "../../services/hooks/hooks";
import {feedPriceSelector, feedSelector} from "../../services/selectors/ingrediensSelectors";
import {FormattedDate} from '@ya.praktikum/react-developer-burger-ui-components';
interface IFeedCard {
    identifier: number;
    date: string;
    name: string;
    ingredients: Array<string>
}

const FeedCard: React.FC<IFeedCard> = ({identifier, date, name, ingredients}) => {
    const arr = useAppSelector(feedSelector(ingredients))
    const price = useAppSelector(feedPriceSelector(ingredients))
    return (
        <li className={`${styles.card} pt-6 pb-6 pr-6 pl-6`}>
            <div className={`${styles.orderContainer}`}>
                <p className={`${styles.identifier} text text_type_digits-default`}>#{identifier}</p>
                <FormattedDate className={`${styles.date} text text_type_main-default text_color_inactive`} date={new Date(date)}/>
            </div>
            <h2 className={`${styles.header} text text_type_main-medium pt-6`}>{name}</h2>
            <div className={`${styles.ingredientContainer} pt-6`}>
                <ul className={styles.ingredientIcons}>
                    {arr.slice(0, 6).map((item, index)=>(
                        index !== 5?
                        (<div className={styles.ingredientIcon} key={index}>
                            <img  src={item.image_mobile} alt={item.name}/>
                        </div>)
                        :
                            (<div className={`${styles.ingredientIcon} ${styles.cover}`} key={index}>
                                <img  src={item.image_mobile} alt={item.name}/>
                                <p className={`${styles.coverText} text text_type_main-default`}>+{arr.length - 5}</p>
                            </div>)
                    )).reverse()}
                </ul>
                <div className={`${styles.currency}`}>
                    <p className={`${styles.text} text text_type_digits-default`}>
                        {price}
                    </p>
                    <div className={styles.icon}>
                        <CurrencyIcon type="primary"/>
                    </div>

                </div>

            </div>
        </li>
    )
}
export default FeedCard;