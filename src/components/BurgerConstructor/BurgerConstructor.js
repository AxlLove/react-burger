import styles from './BurgerConstructor.module.css'
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from "prop-types";
import {ingredientType} from "../../utils/types";
import {useEffect, useState} from "react";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import {IngredientContext} from "../../contexts/ingredientContext";
import {useContext} from "react";

const img = 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'

function BurgerConstructor({data}) {

    const {constructorData, price = 0} = useContext(IngredientContext)
    const [isOpen, setIsOpen] = useState(false)
    const bun = constructorData.find(item => item.type === 'bun')

    const toggleModal = () => {
        setIsOpen(!isOpen)
    }


    return (
        <section className={`${styles.burgerConstructor} pt-25 pb-10`}>
            {bun && <div className='pl-8'>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image_mobile}
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
            {bun && <div className='pl-8'>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image_mobile}
                />
            </div>}
            <div className={styles.price}>
                <div className={styles.currency}>
                    <p className={`${styles.text} text text_type_digits-medium`}>
                        {price}
                    </p>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button onClick={() => {
                    toggleModal()
                }} htmlType={'submit'} type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
            <Modal isOpen={isOpen} toggleModal={toggleModal}>
                <OrderDetails identifier={'034536'}/>
            </Modal>
        </section>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredientType).isRequired,
};
export default BurgerConstructor;