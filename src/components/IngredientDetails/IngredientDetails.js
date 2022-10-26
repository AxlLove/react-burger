import styles from './IngredientDetails.module.css'
import {ingredientType} from "../../utils/types";
import { useSelector } from 'react-redux';
import {getIngredientsSelector} from '../../services/selectors/IngredientInfoSelectors'


function IngredientDetails() {
    const ingredient = useSelector(getIngredientsSelector)
    return (
        <div className={`${styles.ingredientDetails}`}>
            <h2 className={'text text_type_main-large pl-10 pt-15'} style={{alignSelf: 'start'}}>Детали инредиента</h2>
            <img alt={ingredient.name} src={ingredient.image_large}/>
            <p className={'text text_type_main-medium pt-4'}>{ingredient.name}</p>
            <ul className={`${styles.list} pt-8 pb-15`}>
                <li className={`${styles.listItem}`}>
                    <p className={'text text_type_main-default text_color_inactive'}>Калории,ккал</p>
                    <p className={'text text_type_digits-default text_color_inactive'}>{ingredient.calories}</p>
                </li>
                <li className={`${styles.listItem}`}>
                    <p className={'text text_type_main-default text_color_inactive'}>Белки, г</p>
                    <p className={'text text_type_digits-default text_color_inactive'}>{ingredient.proteins}</p>
                </li>
                <li className={`${styles.listItem}`}>
                    <p className={'text text_type_main-default text_color_inactive'}>Жиры, г</p>
                    <p className={'text text_type_digits-default text_color_inactive'}>{ingredient.fat}</p>
                </li>
                <li className={`${styles.listItem}`}>
                    <p className={'text text_type_main-default text_color_inactive'}>Углеводы, г</p>
                    <p className={'text text_type_digits-default text_color_inactive'}>{ingredient.carbohydrates}</p>
                </li>
            </ul>
        </div>

    )
}


export default IngredientDetails;