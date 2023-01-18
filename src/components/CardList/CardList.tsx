import Card from "../Card/Card";
import styles from "./CardList.module.css";
import {useSelector} from "react-redux";
import {getIngredientsSelector} from "../../services/selectors/ingrediensSelectors";
import React, {FC, useMemo} from "react";
import {IIngredient, TIngredientName, TIngredientType} from "../../types/types";

interface ICardListProps {
    type: TIngredientType;
    name: TIngredientName;
    listRef: React.RefObject<HTMLDivElement>;
}



const CardList: FC<ICardListProps> = ({type, name, listRef}) => {
    const ingredients = useSelector(getIngredientsSelector)

    const cards = useMemo(()=> {
        return ingredients?.filter((item) => item.type === type)
    }, [ingredients, type])

    return (
        <div id={name} ref={listRef}>
            <h2 className={'text text_type_main-medium'}>{name}</h2>
            <ul className={`${styles.list} pt-6`}>
                {cards.map((card: IIngredient) => (
                    <Card card={card}
                          key={card._id}/>
                ))}
            </ul>
        </div>
    )
}

export default React.memo(CardList);