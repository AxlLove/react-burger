import styles from "./IngredientIcon.module.css";
import React from "react";

interface IIngredientIcon {
    name: string;
    image: string;
    withoutCount?: boolean;
    count?: number | null;
    list?: boolean;
}

const IngredientIcon: React.FC<IIngredientIcon> = ({name, image, withoutCount=true, count, list=false}) => {
    return (
        withoutCount ? <div className={`${styles.ingredientIcon} ${list && styles.typeList}`}>
                <img src={image} alt={name}/>
            </div>
            :
            <div className={`${styles.ingredientIcon} ${styles.cover} ${list && styles.typeList}`}>
                <img src={image} alt={name}/>
                <p className={`${styles.coverText}  text text_type_main-default`}>+{count}</p>
            </div>
    )
}
export default IngredientIcon;