import Card from "../Card/Card";
import styles from "./CardList.module.css";
import {useSelector} from "react-redux";
import {getIngredientsSelector} from "../../services/selectors/ingrediensSelectors";
import React, {FC} from "react";
import {IIngredient, TIngredientName, TIngredientType} from "../../types/types";

interface ICardListProps {
    type: TIngredientType;
    name: TIngredientName;
    listRef: React.RefObject<HTMLDivElement>;
}

const CardList: FC<ICardListProps> = ({type, name, listRef}) => {
    const ingredients = useSelector(getIngredientsSelector)
    return (
        <div id={name} ref={listRef}>
            <h2 className={'text text_type_main-medium'}>{name}</h2>
            <ul className={`${styles.list} pt-6`}>
                {ingredients.map((card: IIngredient) => (
                    card.type === type &&
                    <Card card={card}
                          key={card._id}/>
                ))}
            </ul>
        </div>
    )
}

export default CardList;