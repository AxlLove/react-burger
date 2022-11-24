import styles from './BurgerConstructor.module.css'
import {ConstructorElement, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import {useSelector, useDispatch} from "react-redux";
import {useState, useCallback,} from 'react';
import {fetchOrder} from '../../services/slices/orderSlice';
import {constructorSlice} from "../../services/slices/burgerConstructorSlice";

import {
    constructorSubmitOrderSelector,
    orderDataSelector,
} from "../../services/selectors/orderSelectors";
import {
    totalPriceSelector,
    constructorDataSelector
} from "../../services/selectors/burgerConstructorSelectors";
import {useDrop} from "react-dnd";
import {v4 as uiv4} from 'uuid'
import ConstructorItem from '../ConstructorItem/ConstructorItem';
import {getUserInfo} from "../../services/selectors/userSelector";
import {useHistory} from "react-router-dom";
import Preloader from "../Preloader/Preloader";
import {IIngredientWithUniqueId} from "../../types/types";

interface IDragCollect {
    isHover: boolean;
    isBunHover: boolean;
}

function BurgerConstructor() {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(getUserInfo)
    const [burgerConstructorModalOpen, setBurgerConstructorModalOpen] = useState(false)
    const {selectedBun, otherIngredients} = useSelector(constructorDataSelector)
    const {onLoad, onError} = useSelector(constructorSubmitOrderSelector)
    const orderData = useSelector(orderDataSelector)
    const totalPrice = useSelector(totalPriceSelector)

    const toggleModal = () => {
        setBurgerConstructorModalOpen(!burgerConstructorModalOpen)
    }

    const handleMakeAnOrder = () => {
        if (!user) {
            history.push('/login')
            return
        }
        // @ts-ignore
        dispatch(fetchOrder(orderData))
        setBurgerConstructorModalOpen(true)
    }


    const [{isHover, isBunHover}, dropTargetRef] = useDrop<IIngredientWithUniqueId, unknown, IDragCollect>({
        accept: 'ingredient',
        collect: (monitor) => ({
            isHover: monitor.getItem()?.type !== 'bun' && monitor.isOver(),
            isBunHover: monitor.getItem()?.type === 'bun' && monitor.isOver()
        }),
        drop(item) {
            dispatch(constructorSlice.actions.addIngredientToCart({...item, dragId: uiv4()}))
        },
    })


    const moveCard = useCallback((dragIndex: number, hoverIndex: number): void => {
        const dragCard = otherIngredients[dragIndex];
        const newCards = [...otherIngredients]
        newCards.splice(dragIndex, 1)
        newCards.splice(hoverIndex, 0, dragCard)
        dispatch(constructorSlice.actions.updateIngredientsInConstructor(newCards))
    }, [otherIngredients, dispatch]);


    return (
        <section ref={dropTargetRef} className={`${styles.burgerConstructor} pt-25 pb-10`}>
            {selectedBun && <div className={`pl-8`}>
                <div className={`${isBunHover ? styles.borderBunTop : ''}`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${selectedBun.name} (верх)`}
                        price={selectedBun.price}
                        thumbnail={selectedBun.image_mobile}
                    /></div>

            </div>}
            <ul className={`${styles.container} ${isHover ? styles.borderIngredients : ''} pr-2`}>
                {otherIngredients && otherIngredients.map(((item: IIngredientWithUniqueId, index: number) => (
                    item.type !== 'bun' &&
                    <ConstructorItem dragId={item.dragId}
                                     index={index}
                                     moveCard={moveCard}
                                     item={item}
                                     key={item.dragId}
                    />
                )))}
            </ul>

            {selectedBun && <div className='pl-8'>
                <div className={`${isBunHover ? styles.borderBunBot : ''}`}>
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
                <Modal onClose={toggleModal}>
                    <OrderDetails/>
                </Modal>
            }
            {onLoad &&
                <Modal>
                    <Preloader/>
                </Modal>
            }
        </section>
    )
}

export default BurgerConstructor;