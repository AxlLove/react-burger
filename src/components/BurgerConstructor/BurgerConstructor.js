import styles from './BurgerConstructor.module.css'
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from "prop-types";
import {ingredientType} from "../../utils/types";
import {useState} from "react";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";

const img = 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'

function BurgerConstructor({data}) {

    const [isOpen, setIsOpen] = useState(false)

    const toggleModal = () => {
        setIsOpen(!isOpen)
    }


    return (
        <section className={`${styles.burgerConstructor} pt-25 pb-10`}>
            <div className='pl-8'>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={img}
                />
            </div>
            <ul className={`${styles.container} pr-2`}>
                {data.map((item => (
                    item.type !== 'bun' && <li className={styles.constructorItem} key={item._id}>
                        <DragIcon type="primary"/>
                        <ConstructorElement
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image_mobile}/>
                    </li>
                )))}
            </ul>
            <div className='pl-8'>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={img}
                />
            </div>
            <div className={styles.price}>
                <div className={styles.currency}>
                    <p className={`${styles.text} text text_type_digits-medium`}>
                        610
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