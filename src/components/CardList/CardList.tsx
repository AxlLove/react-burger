import Card from "../Card/Card";
import styles from "./CardList.module.css";
import {useSelector} from "react-redux";
import {getIngredientsSelector} from "../../services/selectors/ingrediensSelectors";
import React, { FC } from "react";

type TIngredientType = 'bun' | 'sauce' | 'main';
type TIngredientName = 'Булки' | 'Соусы' | 'Начинки';

interface ICardListProps {
    type: TIngredientType;
    name: TIngredientName;
    listRef: React.RefObject<HTMLDivElement>;
}

interface IIngredient {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v?: number;
}
//TODO вынести тип
interface IIngredientWithUniqueId extends IIngredient {
    dragId: string;
}
//TODO вынести 
const CardList: FC <ICardListProps> = ({type, name, listRef}) => {
    const ingredients = useSelector(getIngredientsSelector)
    return (
        <div id={name} ref={listRef}>
            <h2 className={'text text_type_main-medium'}>{name}</h2>
            <ul  className={`${styles.list} pt-6`}>
                {ingredients.map((card: IIngredientWithUniqueId) => (
                    card.type === type &&
                    <Card card={card}
                          key={card._id}/>
                ))}
            </ul>
        </div>
    )
}

export default CardList;