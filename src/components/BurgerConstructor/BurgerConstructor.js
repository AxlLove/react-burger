import styles from './BurgerConstructor.module.css'
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import {IngredientContext} from "../../contexts/ingredientContext";
import {useContext, useState, useMemo} from "react";
import {makeAnOrder} from "../../utils/Api";


function BurgerConstructor() {
    const [orderDetails, setOrderDetails] = useState({})
    const [burgerConstructorModalOpen, setBurgerConstructorModalOpen] = useState(false)

    const {
        otherIngredients,
        selectedBun,
    } = useContext(IngredientContext)


    const toggleModal = () => {
        setBurgerConstructorModalOpen(!burgerConstructorModalOpen)
    }

    const handleMakeAnOrder = () => {
        //TODO добавить ux сообщение об ошибке, блок кнопки
        const constructorData = [selectedBun, ...otherIngredients, selectedBun]
        const orderData = {ingredients: constructorData.map(item => item._id)}
        makeAnOrder(orderData).then(res => {
            setOrderDetails(res)
            setBurgerConstructorModalOpen(true)
        }).catch(console.log)
    }

    const memoizedPrice = useMemo(() => {
        if (otherIngredients && selectedBun) {
            const constructorData = [selectedBun, ...otherIngredients, selectedBun]
            return constructorData.reduce((acc, item) => acc + item.price, 0)
        }
    }, [otherIngredients, selectedBun])

    return (
        <section className={`${styles.burgerConstructor} pt-25 pb-10`}>
            {selectedBun && <div className='pl-8'>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${selectedBun.name} (верх)`}
                    price={selectedBun.price}
                    thumbnail={selectedBun.image_mobile}
                />
            </div>}
            <ul className={`${styles.container} pr-2`}>
                {otherIngredients && otherIngredients.map(((item, index) => (
                    item.type !== 'bun' && <li className={styles.constructorItem} key={index}>
                        <DragIcon type="primary"/>
                        <ConstructorElement
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image_mobile}/>
                    </li>
                )))}
            </ul>
            {selectedBun && <div className='pl-8'>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${selectedBun.name} (низ)`}
                    price={selectedBun.price}
                    thumbnail={selectedBun.image_mobile}
                />
            </div>}
            <div className={styles.price}>
                {memoizedPrice && <div className={styles.currency}>
                    <p className={`${styles.text} text text_type_digits-medium`}>
                        {memoizedPrice}
                    </p>
                    <CurrencyIcon type="primary"/>
                </div>}

                <Button onClick={handleMakeAnOrder} htmlType={'button'} type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
            {burgerConstructorModalOpen &&
                <Modal toggleModal={toggleModal}>
                    <OrderDetails identifier={orderDetails.order.number}/>
                </Modal>
            }
        </section>
    )
}

export default BurgerConstructor;