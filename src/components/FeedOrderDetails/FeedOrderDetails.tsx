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

const FeedOrderDetails: React.FC = ()=> {

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
            <h2>#{test.identifier}</h2>
            <p>{test.name}</p>
            <p>{test.status}</p>
            <p>Состав</p>
            <ul className={styles.ingredientList}>
                {arr.map(item => (
                        <li className={styles.ingredient}>
                            <IngredientIcon name={item.name} image={item.image_mobile}/>
                            <p>{item.name}</p>
                            <PriceWithCurrentIcon price={item.type !== 'bun'? `${item.price}`: `2 x ${item.price}`}/>
                        </li>
                ))}
            </ul>
            <div>
                <FormattedDate className={`${styles.date} text text_type_main-default text_color_inactive`} date={new Date(test.date)}/>
                <PriceWithCurrentIcon price={price}/>
            </div>
        </div>
    )
}

export default FeedOrderDetails;
