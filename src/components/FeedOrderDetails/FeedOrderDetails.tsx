import React from "react";
import styles from './FeedOrderDetails.module.css'
import {useAppSelector} from "../../services/hooks/hooks";
import {feedPriceSelector, feedSelector} from "../../services/selectors/ingrediensSelectors";
import {FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import PriceWithCurrentIcon from "../PriceWithCurrentIcon/PriceWithCurrentIcon";
import IngredientIcon from "../IngredientIcon/IngredientIcon";

interface IFeedOrderDetails {
    identifier: number;
    name: string;
    status: string;
    ingredients: Array<string>;
    date: string;
}
interface IFeedOrderDetailst {
    withPage?: boolean;
}
const FeedOrderDetails: React.FC<IFeedOrderDetailst> = ({withPage})=> {

    const test: IFeedOrderDetails={ identifier: 0o34533, name: 'Супер пупер бургер', status: 'Выполнен', ingredients: [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733c8",
        "60d3b41abdacab0026a733d0",
        "60d3b41abdacab0026a733d1",
        "60d3b41abdacab0026a733d1",
        "60d3b41abdacab0026a733d1",
        "60d3b41abdacab0026a733d1",
        "60d3b41abdacab0026a733d1"], date: `2021-06-23T14:43:22.587Z`}
    const arr = useAppSelector(feedSelector(test.ingredients))
    const price = useAppSelector(feedPriceSelector(test.ingredients))
    return (
        <div className={styles.feedOrderDetails}>
            <h2 className={`text text_type_digits-default ${withPage && styles.withPage}`}>#{test.identifier}</h2>
            <p className={`text text_type_main-medium mt-10`}>{test.name}</p>
            <p className={`text text_type_main-small mt-3 ${test.status === 'Выполнен' ? styles.statusDone : ''}`}>{test.status}</p>
            <p className={`text text_type_main-medium mt-15`}>Состав</p>
            <ul className={`${styles.ingredientList} mt-6`}>
                {arr.map(item => (
                        <li className={styles.ingredient}>
                            <div className={styles.ingredientContainer}>
                                <IngredientIcon name={item.name} image={item.image_mobile}/>
                                <p>{item.name}</p>
                            </div>
                                <PriceWithCurrentIcon price={item.type !== 'bun'? `${item.price}`: `2 x ${item.price}`}/>
                        </li>
                ))}
            </ul>
            <div className={`${styles.dateContainer} mt-10`}>
                <FormattedDate className={`${styles.date} text text_type_main-default text_color_inactive`} date={new Date(test.date)}/>
                <PriceWithCurrentIcon price={price}/>
            </div>
        </div>
    )
}

export default FeedOrderDetails;
