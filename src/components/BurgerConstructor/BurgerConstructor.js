import styles from './BurgerConstructor.module.css'
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from "prop-types";
import {ingredientType} from "../../utils/types";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import {IngredientContext} from "../../contexts/ingredientContext";
import {useContext} from "react";

function BurgerConstructor() {
    const {constructorData, price, selectedBun, handleMakeAnOrder , orderDetails, burgerConstructorModalOpen, setBurgerConstructorModalOpen} = useContext(IngredientContext)

    const toggleModal = () => {
        setBurgerConstructorModalOpen(!burgerConstructorModalOpen)
    }

    const submit=(e)=> {
        e.preventDefault()
        handleMakeAnOrder()
    }



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
                {constructorData && constructorData.map(((item, index) => (
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
                <div className={styles.currency}>                
                    <p className={`${styles.text} text text_type_digits-medium`}>
                        {price}
                    </p>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button onClick={submit} htmlType={'submit'} type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
            { burgerConstructorModalOpen &&
                        <Modal isOpen={burgerConstructorModalOpen} toggleModal={toggleModal}>
                        <OrderDetails identifier={orderDetails.order.number}/>
                    </Modal>
                    }

        </section>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredientType).isRequired,
};
export default BurgerConstructor;