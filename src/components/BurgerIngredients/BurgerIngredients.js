import styles from './BurgerIngredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState, useEffect} from "react";
import CardList from "../CardList/CardList";
import PropTypes from 'prop-types';
import {ingredientType} from "../../utils/types";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {useSelector, useDispatch} from "react-redux";
import {ingredientSlice} from "../../services/slices/IngerdientSlice";

function BurgerIngredients() {
    const [current, setCurrent] = useState('Булки')
    const [isOpen, setIsOpen] = useState(false)

    const dispatch = useDispatch()

    
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

    
    return (
        <section className={styles.burgerIngredients}>
            <h1 className={`text text_type_main-large pt-10`}>Соберите бургер</h1>
            <nav className={`${styles.tabs} pt-5 pb-10`}>
                <Tab active={current === 'Булки'} value={'Булки'} onClick={setCurrent}>Булки</Tab>
                <Tab active={current === 'Соусы'} value={'Соусы'} onClick={setCurrent}>Соусы</Tab>
                <Tab active={current === 'Начинки'} value={'Начинки'} onClick={setCurrent}>Начинки</Tab>
            </nav>
            <div className={`${styles.ingredientsLists}`}>
                <CardList name={'Булки'} type={'bun'} handeCardClick={handeCardClick}/>
                <CardList name={'Соусы'} type={'sauce'} handeCardClick={handeCardClick}/>
                <CardList name={'Начинки'} type={'main'} handeCardClick={handeCardClick}/>
            </div>
            {isOpen && <Modal toggleModal={closeModal}>
                <IngredientDetails/>
            </Modal>}

        </section>
    )
}




export default BurgerIngredients;

// TODO может вынести обработчики в компонет?