import styles from './IngredientDetails.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {getIngredientsSelector} from '../../services/selectors/ingrediensSelectors'
import {getIngredientInfoSelector} from  '../../services/selectors/IngredientInfoSelectors'
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {ingredientInfoSlice} from "../../services/slices/ingredientInfoSlice";
import PropTypes from "prop-types";


function IngredientDetails({children}) {
    const ingredient = useSelector(getIngredientInfoSelector)
    const ingredients = useSelector(getIngredientsSelector)
    const dispatch = useDispatch()
    const {ingredientId} = useParams()

    useEffect(()=> {
        if(ingredients) {
            dispatch(ingredientInfoSlice.actions.addIngredientInfo(ingredients.find(item=> item._id === ingredientId)))
        }
    }, [ingredientId, ingredients, dispatch])

    return (
        <div className={`${styles.ingredientDetails}`}>
            {children}
            <img alt={ingredient?.name} src={ingredient?.image_large}/>
            <p className={'text text_type_main-medium pt-4'}>{ingredient?.name}</p>
            <ul className={`${styles.list} pt-8 pb-15`}>
                <li className={`${styles.listItem}`}>
                    <p className={'text text_type_main-default text_color_inactive'}>Калории,ккал</p>
                    <p className={'text text_type_digits-default text_color_inactive'}>{ingredient?.calories}</p>
                </li>
                <li className={`${styles.listItem}`}>
                    <p className={'text text_type_main-default text_color_inactive'}>Белки, г</p>
                    <p className={'text text_type_digits-default text_color_inactive'}>{ingredient?.proteins}</p>
                </li>
                <li className={`${styles.listItem}`}>
                    <p className={'text text_type_main-default text_color_inactive'}>Жиры, г</p>
                    <p className={'text text_type_digits-default text_color_inactive'}>{ingredient?.fat}</p>
                </li>
                <li className={`${styles.listItem}`}>
                    <p className={'text text_type_main-default text_color_inactive'}>Углеводы, г</p>
                    <p className={'text text_type_digits-default text_color_inactive'}>{ingredient?.carbohydrates}</p>
                </li>
            </ul>
        </div>

    )
}
IngredientDetails.propTypes = {
    children: PropTypes.element,
};

export default IngredientDetails;