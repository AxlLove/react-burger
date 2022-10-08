import Card from "../Card/Card";
import styles from "./CardList.module.css";
import PropTypes from "prop-types";
import {ingredientType} from "../../utils/types";

function CardList({data, type, name, handeCardClick}) {
    return (
        <>
            <h2 className={'text text_type_main-medium'}>{name}</h2>
            <ul className={`${styles.list} pt-6`}>
                {data.map((card) => (
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
    data: PropTypes.arrayOf(ingredientType).isRequired,
    handeCardClick: PropTypes.func.isRequired
};

export default CardList;