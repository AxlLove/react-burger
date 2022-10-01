import styles from './BurgerConstructor.module.css'
import {useState} from "react";
import {ConstructorElement, DragIcon, Button, CurrencyIcon}from "@ya.praktikum/react-developer-burger-ui-components"

const img = 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png'
function BurgerConstructor ({data}) {
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

                <li className={styles.constructorItem}>
                <DragIcon type="primary"/>
                <ConstructorElement
                text="Краторная булка N-200i (верх)"
                price={50}
                thumbnail={img}/>
                </li>
                <li className={styles.constructorItem}>
                <DragIcon type="primary"/>
                <ConstructorElement
                text="Краторная булка N-200i (верх)"
                price={50}
                thumbnail={img}/>
                </li>
                <li className={styles.constructorItem}>
                <DragIcon type="primary"/>
                <ConstructorElement
                text="Краторная булка N-200i (верх)"
                price={50}
                thumbnail={img}/>
                </li>
                <li className={styles.constructorItem}>
                <DragIcon type="primary"/>
                <ConstructorElement
                text="Краторная булка N-200i (верх)"
                price={50}
                thumbnail={img}/>
                </li>
                <li className={styles.constructorItem}>
                <DragIcon type="primary"/>
                <ConstructorElement
                text="Краторная булка N-200i (верх)"
                price={50}
                thumbnail={img}/>
                </li>
                <li className={styles.constructorItem}>
                <DragIcon type="primary"/>
                <ConstructorElement
                text="Краторная булка N-200i (верх)"
                price={50}
                thumbnail={img}/>
                </li>



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
                <CurrencyIcon type="primary" />
                </div>

                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>

        </section>
    )
};
export default BurgerConstructor;