import styles from "../FeedCard/FeedCard.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

interface IPriceWithCurrentIcon {
    price?: string | number ;
    extraClass?: string;
}

const PriceWithCurrentIcon: React.FC<IPriceWithCurrentIcon> = ({price, extraClass}) => {
    return (
        <div className={`${styles.currency}`}>
            <p className={`${styles.text} text text_type_digits-default ${extraClass}`}>
                {price}
            </p>
            <div className={styles.icon}>
                <CurrencyIcon type="primary"/>
            </div>
        </div>
    )
}

export default PriceWithCurrentIcon;