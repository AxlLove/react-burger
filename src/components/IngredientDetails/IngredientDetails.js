import styles from './IngredientDetails.module.css'
import {ingredientType} from "../../utils/types";
import {useEffect} from "react";


function IngredientDetails({card}) {
    return (
        <div className={`${styles.ingredientDetails}`}>
            <h2 className={'text text_type_main-large pl-10 pt-15'} style={{alignSelf: 'start'}}>Детали инредиента</h2>
            <img alt={card.name} src={card.image_large}/>
            <p className={'text text_type_main-medium pt-4'}>{card.name}</p>
            <ul className={`${styles.list} pt-8 pb-15`}>
                <li className={`${styles.listItem}`}>
                    <p className={'text text_type_main-default text_color_inactive'}>Калории,ккал</p>
                    <p className={'text text_type_digits-default text_color_inactive'}>{card.calories}</p>
                </li>
                <li className={`${styles.listItem}`}>
                    <p className={'text text_type_main-default text_color_inactive'}>Белки, г</p>
                    <p className={'text text_type_digits-default text_color_inactive'}>{card.proteins}</p>
                </li>
                <li className={`${styles.listItem}`}>
                    <p className={'text text_type_main-default text_color_inactive'}>Жиры, г</p>
                    <p className={'text text_type_digits-default text_color_inactive'}>{card.fat}</p>
                </li>
                <li className={`${styles.listItem}`}>
                    <p className={'text text_type_main-default text_color_inactive'}>Углеводы, г</p>
                    <p className={'text text_type_digits-default text_color_inactive'}>{card.carbohydrates}</p>
                </li>
            </ul>
        </div>

    )
}

IngredientDetails.propTypes = {
    card: ingredientType,
};
export default IngredientDetails;