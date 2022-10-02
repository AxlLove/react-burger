import styles from './BurgerConstructor.module.css'
import {useState} from "react";
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from "prop-types";

const img = 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'

function BurgerConstructor({data}) {
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
                    <li className={styles.constructorItem} key={item._id}>
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
                <Button htmlType={'button'} type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>

        </section>
    )
};

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number.isRequired,
        image: PropTypes.string,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string,
        __v: PropTypes.number,
    })).isRequired,
};
export default BurgerConstructor;