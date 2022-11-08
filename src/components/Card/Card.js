import styles from './Card.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {ingredientType} from "../../utils/types";
import {counterSelector} from '../../services/selectors/ingrediensSelectors'
import {useSelector} from 'react-redux';
import {useDrag} from "react-dnd";
import {Link} from 'react-router-dom'
import {useLocation} from "react-router-dom";


function Card({card}) {
    const location = useLocation();
    const ingredientId = card._id
    const counter = useSelector(counterSelector(card))
    const [{opacity}, dragRef] = useDrag({
        type: 'ingredient',
        item: card,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    })

    return (
        <Link
            key={ingredientId}
            to={{
                pathname: `/ingredients/${ingredientId}`,
                state: {background: location},
            }}
            className={styles.link}
        >
            <li className={`${styles.card}`}>
                {counter > 0 && <Counter count={counter} size="default"/>}
                <img ref={dragRef} style={{opacity}} className={`${styles.image}`} src={card.image} alt={card.name}/>
                <div className={`${styles.price} mt-1`}>
                    <p className={`text text_type_digits-default ${styles.wordBreak}`}>{card.price}</p>
                    <CurrencyIcon type={'primary'}/>
                </div>
                <p className={`text text_type_main-default pt-1 ${styles.wordBreak}`}>{card.name}</p>
            </li>
        </Link>

    )
}

Card.propTypes = {
    card: ingredientType.isRequired,
    handeCardClick: PropTypes.func.isRequired
};
export default Card;