import styles from './Card.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function Card ( {image, price, name} ) {
    return (
        <li className={`${styles.card}`}>
            <Counter count={1} size="default" />
            <img className={`${styles.image} pl-4 pr-5`} src={image} alt={name}/>
            <div className={`${styles.price} mt-1`}>
                <p className={`text text_type_digits-default ${styles.wordBreak}`}>{price}</p>
                <CurrencyIcon/>
            </div>
            <p className={`text text_type_main-default pt-1 ${styles.wordBreak}`}>{name}</p>
        </li>
    )
}

export default Card;