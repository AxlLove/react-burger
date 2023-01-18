import styles from './BurgerIngredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC, useRef} from "react";
import CardList from "../CardList/CardList";
import {IngredientTypeEng, IngredientTypeRU} from "../../utils/constants";
import {useIntersectionObserver} from "../../hooks/useIntersectionObserver";

const BurgerIngredients: FC = () => {

    const mainRef = useRef<HTMLDivElement>(null)
    const bunRef = useRef<HTMLDivElement>(null)
    const sauceRef = useRef<HTMLDivElement>(null)

    const {containerRef, current} = useIntersectionObserver({
        rootMargin: '0px 0px -90% 0px',
        threshold: 0
    })

    const handleClickTab = (ref: React.RefObject<HTMLDivElement>) => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({behavior: 'smooth'})
        }
    }

    return (
        <section className={styles.burgerIngredients}>
            <h1 className={`text text_type_main-large pt-10`}>Соберите бургер</h1>
            <nav className={`${styles.tabs} pt-5 pb-10`}>
                <Tab active={current === IngredientTypeRU.BUN_INGREDIENT_TYPE_RU} value={IngredientTypeRU.BUN_INGREDIENT_TYPE_RU} onClick={() => {
                    handleClickTab(bunRef)
                }}>Булки</Tab>
                <Tab active={current === IngredientTypeRU.SAUCE_INGREDIENT_TYPE_RU} value={IngredientTypeRU.SAUCE_INGREDIENT_TYPE_RU} onClick={() => {
                    handleClickTab(sauceRef)
                }}>Соусы</Tab>
                <Tab active={current === IngredientTypeRU.MAIN_INGREDIENT_TYPE_RU} value={IngredientTypeRU.MAIN_INGREDIENT_TYPE_RU} onClick={() => {
                    handleClickTab(mainRef)
                }}>Начинки</Tab>
            </nav>
            <div ref={containerRef} className={`${styles.ingredientsLists}`}>
                <CardList listRef={bunRef} name={IngredientTypeRU.BUN_INGREDIENT_TYPE_RU} type={IngredientTypeEng.BUN_INGREDIENT_TYPE_ENG}/>
                <CardList listRef={sauceRef} name={IngredientTypeRU.SAUCE_INGREDIENT_TYPE_RU} type={IngredientTypeEng.SAUCE_INGREDIENT_TYPE_ENG}/>
                <CardList listRef={mainRef} name={IngredientTypeRU.MAIN_INGREDIENT_TYPE_RU} type={IngredientTypeEng.MAIN_INGREDIENT_TYPE_ENG}/>
            </div>
        </section>
    )
}


export default React.memo(BurgerIngredients);
