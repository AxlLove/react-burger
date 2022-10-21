import Card from "../Card/Card";
import styles from "./CardList.module.css";
import PropTypes from "prop-types";
import {ingredientType} from "../../utils/types";
import {useSelector} from "react-redux";

function CardList({type, name, handeCardClick}) {
    const ingredients = useSelector(store=> store.ingredients.ingredientData)
    return (
        <>
            <h2 className={'text text_type_main-medium'}>{name}</h2>
            <ul className={`${styles.list} pt-6`}>
                {ingredients.map((card) => (
                    card.type === type &&
                    <Card handeCardClick={handeCardClick}
                          card={card}
                          key={card._id}/>
                ))}
            </ul>
        </>
    )
}

CardList.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    handeCardClick: PropTypes.func.isRequired
};

export default CardList;