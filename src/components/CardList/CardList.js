import Card from "../Card/Card";
import styles from "./CardList.module.css";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {getIngredientsSelector} from "../../services/selectors/ingrediensSelectors";

function CardList({type, name, listRef}) {
    const ingredients = useSelector(getIngredientsSelector)
    return (
        <div name={name} ref={listRef}>
            <h2 className={'text text_type_main-medium'}>{name}</h2>
            <ul  className={`${styles.list} pt-6`}>
                {ingredients.map((card) => (
                    card.type === type &&
                    <Card card={card}
                          key={card._id}/>
                ))}
            </ul>
        </div>
    )
}

CardList.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    listRef: PropTypes.object.isRequired,
};

export default CardList;