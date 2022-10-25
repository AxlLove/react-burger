import styles from './BurgerConstructor.module.css'
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import {useSelector, useDispatch} from "react-redux";
import {useState, useMemo} from 'react';
import {fetchOrder, ingredientSlice} from '../../services/slices/IngerdientSlice';
import {
    constructorSubmitOrderSelector,
    constructorDataSelector,
    orderDataSelector,
    totalPriceSelector
} from "../../services/selectors/ingrediensSelectors";
import {useDrop} from "react-dnd";
import {useEffect} from 'react'
function BurgerConstructor() {
    const dispatch = useDispatch()

    const [burgerConstructorModalOpen, setBurgerConstructorModalOpen] = useState(false)
    const {selectedBun, otherIngredients} = useSelector(constructorDataSelector)
    const {onLoad, onError} = useSelector(constructorSubmitOrderSelector)
    const orderData = useSelector(orderDataSelector)
    const totalPrice = useSelector(totalPriceSelector)
    const toggleModal = () => {
        setBurgerConstructorModalOpen(!burgerConstructorModalOpen)
    }

    const handleMakeAnOrder = () => {
        dispatch(fetchOrder(orderData))
        setBurgerConstructorModalOpen(true)
        console.log(orderData)
    }


const [{isHover, isBunHover}, dropTargetRef] = useDrop( {
    accept: 'ingredient',
    collect: monitor => ({
        isHover: monitor.getItem()?.type !== 'bun' && monitor.isOver(),
        isBunHover: monitor.getItem()?.type === 'bun' && monitor.isOver()
    }),
    drop(item) {
        dispatch(ingredientSlice.actions.addIngredientToCart(item))
        //TODO подписать id
    },

})
//TODO изучить
//

    const preventDefault = (e) => e.preventDefault();
    return (
        <section ref={dropTargetRef} className={`${styles.burgerConstructor} pt-25 pb-10`}>
            {selectedBun && <div className={`pl-8`} >
                <div className={`${isBunHover? styles.borderBunTop : ''}`}>
                    <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${selectedBun.name} (верх)`}
                    price={selectedBun.price}
                    thumbnail={selectedBun.image_mobile}
                /></div>

            </div>}
            <ul className={`${styles.container} ${isHover? styles.borderIngredients : ''} pr-2`}>
                {otherIngredients && otherIngredients.map(((item, index) => (
                    item.type !== 'bun' && <li className={styles.constructorItem} key={index}>
                        <DragIcon type="primary"/>
                        <ConstructorElement
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image_mobile}/>
                        {/*//TODO создать новый компонент*/}
                    </li>
                )))}
            </ul>

            {selectedBun && <div className='pl-8'>
                <div className={`${isBunHover? styles.borderBunBot : ''}`}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${selectedBun.name} (низ)`}
                        price={selectedBun.price}
                        thumbnail={selectedBun.image_mobile}
                    />
                </div>
            </div>}
            <div className={styles.price}>
                {totalPrice && <div className={styles.currency}>
                    <p className={`${styles.text} text text_type_digits-medium`}>
                        {totalPrice}
                    </p>
                    <CurrencyIcon type="primary"/>
                </div>}
                <Button onClick={handleMakeAnOrder} htmlType={'button'} type="primary" size="large" disabled={onLoad}>
                    Оформить заказ
                </Button>

            </div>
            {
                onError &&
                <span className={`${styles.error} text text_type_main-default`}>Упс, произошла ошибка! Поробуйте еще раз.</span>
            }

            {burgerConstructorModalOpen && !onLoad && !onError &&
                <Modal toggleModal={toggleModal}>
                    <OrderDetails/>
                </Modal>
            }
        </section>
    )
}
// TODO возможно проверка на булку не нужна,
export default BurgerConstructor;