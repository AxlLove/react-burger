import styles from './Card.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {ingredientType} from "../../utils/types";
import {counterSelector} from '../../services/selectors/ingrediensSelectors'
import { useSelector } from 'react-redux';

function Card({card, handeCardClick}) {
    const counter = useSelector (counterSelector(card))
    return (
        <li onClick={() => handeCardClick(card)} className={`${styles.card}`}>
            <Counter count={counter} size="default"/>
            <img className={`${styles.image} pl-4 pr-5`} src={card.image} alt={card.name}/>
            <div className={`${styles.price} mt-1`}>
                <p className={`text text_type_digits-default ${styles.wordBreak}`}>{card.price}</p>
                <CurrencyIcon type={'primary'}/>
            </div>
            <p className={`text text_type_main-default pt-1 ${styles.wordBreak}`}>{card.name}</p>
        </li>
    )
}

Card.propTypes = {
    card: ingredientType.isRequired,
    handeCardClick: PropTypes.func.isRequired
};

export default Card;
