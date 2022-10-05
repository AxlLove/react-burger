import styles from './Card.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function Card({image, price, name}) {
    return (
        <li className={`${styles.card}`}>
            <Counter count={1} size="default"/>
            <img className={`${styles.image} pl-4 pr-5`} src={image} alt={name}/>
            <div className={`${styles.price} mt-1`}>
                <p className={`text text_type_digits-default ${styles.wordBreak}`}>{price}</p>
                <CurrencyIcon type={'primary'}/>
            </div>
            <p className={`text text_type_main-default pt-1 ${styles.wordBreak}`}>{name}</p>
        </li>
    )
}

Card.propTypes = {
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
};

export default Card;
