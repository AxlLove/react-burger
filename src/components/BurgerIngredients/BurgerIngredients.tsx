import styles from './BurgerIngredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC, useRef} from "react";
import CardList from "../CardList/CardList";

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
                <Tab active={current === 'Булки'} value={'Булки'} onClick={() => {
                    handleClickTab(bunRef)
                }}>Булки</Tab>
                <Tab active={current === 'Соусы'} value={'Соусы'} onClick={() => {
                    handleClickTab(sauceRef)
                }}>Соусы</Tab>
                <Tab active={current === 'Начинки'} value={'Начинки'} onClick={() => {
                    handleClickTab(mainRef)
                }}>Начинки</Tab>
            </nav>
            <div ref={containerRef} className={`${styles.ingredientsLists}`}>
                <CardList listRef={bunRef} name={'Булки'} type={'bun'}/>
                <CardList listRef={sauceRef} name={'Соусы'} type={'sauce'}/>
                <CardList listRef={mainRef} name={'Начинки'} type={'main'}/>
            </div>

        </section>
    )
}


export default BurgerIngredients;

//TODO ПРИСВОИТЬ КОНСТАНТАМ ИМЕНА ПЕРЕИСПОЛЬЗУЕМЫХ ПЕРЕМЕННЫХ