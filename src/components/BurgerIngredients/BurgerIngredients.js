import styles from './BurgerIngredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState, useEffect, useRef} from "react";
import CardList from "../CardList/CardList";
import PropTypes from 'prop-types';
import {ingredientType} from "../../utils/types";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {useSelector, useDispatch} from "react-redux";
import {ingredientSlice} from "../../services/slices/IngerdientSlice";
import {useIntersectionObserver} from "../hooks/useIntersectionObserver";


function BurgerIngredients() {
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()

    const mainRef = useRef()
    const bunRef = useRef()
    const sauceRef = useRef()
    const [containerRef, current , setCurrent] = useIntersectionObserver({
        rootMargin: '0px 0px -65% 0px',
        threshold: [0, 0.7]
    })


    const handeCardClick = (item) => {
        // dispatch(ingredientSlice.actions.addIngredientInfo(item))
        // openModal()

        // TODO вернуть открытие модального окна

        dispatch(ingredientSlice.actions.addIngredientToCart(item))
    }
    const openModal = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false)
        dispatch(ingredientSlice.actions.deleteIngredientInfo())
    }

    const handleClickTab = (e) => {
        let ref = e === 'Начинки'? mainRef : 'Соусы'? sauceRef : 'Булки'? bunRef : ''
        console.log(ref.current , e)
            ref.current.scrollIntoView({behavior: 'smooth'})
        setCurrent(e)
    }

    return (
        <section className={styles.burgerIngredients}>
            <h1 className={`text text_type_main-large pt-10`}>Соберите бургер</h1>
            <nav className={`${styles.tabs} pt-5 pb-10`}>
                <Tab active={current === 'Булки'} value={'Булки'} onClick={handleClickTab}>Булки</Tab>
                <Tab active={current === 'Соусы'} value={'Соусы'} onClick={handleClickTab}>Соусы</Tab>
                <Tab active={current === 'Начинки'} value={'Начинки'} onClick={handleClickTab}>Начинки</Tab>
            </nav>
            <div ref={containerRef} className={`${styles.ingredientsLists}`}>
                <CardList listRef={bunRef} name={'Булки'} type={'bun'} handeCardClick={handeCardClick}/>
                <CardList listRef={sauceRef} name={'Соусы'} type={'sauce'} handeCardClick={handeCardClick}/>
                <CardList listRef={mainRef} name={'Начинки'} type={'main'} handeCardClick={handeCardClick}/>

            </div>
            {isOpen && <Modal toggleModal={closeModal}>
                <IngredientDetails/>
            </Modal>}

        </section>
    )
}


export default BurgerIngredients;

// TODO может вынести обработчики в компонет?