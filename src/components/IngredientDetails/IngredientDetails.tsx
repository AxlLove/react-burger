import styles from './IngredientDetails.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {getIngredientsSelector} from '../../services/selectors/ingrediensSelectors'
import {getIngredientInfoSelector} from '../../services/selectors/IngredientInfoSelectors'
import {useLocation, useParams, useRouteMatch} from "react-router-dom";
import React, {FC, useEffect} from "react";
import {addIngredientInfo, deleteIngredientInfo} from "../../services/slices/ingredientInfoSlice";
import {IIngredient} from "../../types/types";


const IngredientDetails: FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {
    const ingredient = useSelector(getIngredientInfoSelector)
    const ingredients = useSelector(getIngredientsSelector)
    const {isExact} = useRouteMatch()
    const dispatch = useDispatch()
    const {ingredientId} = useParams<{ ingredientId?: string }>()
    const location = useLocation()
    useEffect(() => {
        //ts-ignore
        console.log(location?.state)
        if (ingredients) {
            dispatch(addIngredientInfo(ingredients.find((item: IIngredient) => item._id === ingredientId)))
        }
    }, [ingredientId, ingredients, dispatch])
    useEffect(() => {
        if (!isExact) {
            dispatch(deleteIngredientInfo())
        }
    }, [isExact, dispatch])

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

export default IngredientDetails;

//TODO use APpp disp