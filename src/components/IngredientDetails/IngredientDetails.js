import styles from './IngredientDetails.module.css'
import PropTypes from "prop-types";


function IngredientDetails({calories, image, name, fat, carbohydrates, proteins}) {
    return (
        <div className={`${styles.ingredientDetails}`}>
            <h2 className={'text text_type_main-large pl-10 pt-15'} style={{alignSelf: 'start'}}>Детали инредиента</h2>
            <img src={image}/>
            <p className={'text text_type_main-medium pt-4'}>{name}</p>
            <ul className={`${styles.list} pt-8 pb-15`}>
                <li className={`${styles.listItem}`}>
                    <p className={'text text_type_main-default text_color_inactive'}>Калории,ккал</p>
                    <p className={'text text_type_digits-default text_color_inactive'}>{calories}</p>
                </li>
                <li className={`${styles.listItem}`}>
                    <p className={'text text_type_main-default text_color_inactive'}>Белки, г</p>
                    <p className={'text text_type_digits-default text_color_inactive'}>{proteins}</p>
                </li>
                <li className={`${styles.listItem}`}>
                    <p className={'text text_type_main-default text_color_inactive'}>Жиры, г</p>
                    <p className={'text text_type_digits-default text_color_inactive'}>{fat}</p>
                </li>
                <li className={`${styles.listItem}`}>
                    <p className={'text text_type_main-default text_color_inactive'}>Углеводы, г</p>
                    <p className={'text text_type_digits-default text_color_inactive'}>{carbohydrates}</p>
                </li>
            </ul>
        </div>

    )
}

IngredientDetails.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
};
export default IngredientDetails;