import styles from './BurgerConstructor.module.css'
import {ConstructorElement, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import {useAppDispatch, useAppSelector} from "../../services/hooks/hooks";
import {useState, useCallback,} from 'react';
import {fetchOrder} from '../../services/slices/orderSlice';
import {addIngredientToCart, updateIngredientsInConstructor} from "../../services/slices/burgerConstructorSlice";

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
import {IIngredientWithUniqueId} from "../../types/types";


interface IDragCollect {
    isHover: boolean;
    isBunHover: boolean;
}

function BurgerConstructor() {
    const dispatch = useAppDispatch()
    const history = useHistory()
    const user = useAppSelector(getUserInfo)
    const [burgerConstructorModalOpen, setBurgerConstructorModalOpen] = useState(false)
    const {selectedBun, otherIngredients} = useAppSelector(constructorDataSelector)
    const {onLoad, onError} = useAppSelector(constructorSubmitOrderSelector)
    const orderData = useAppSelector(orderDataSelector)
    const totalPrice = useAppSelector(totalPriceSelector)

    const [noBunErr, setNoBunErr] = useState(false)
    const [noIngredientErr, setNoIngredientErr] = useState(false)
    const toggleModal = () => {
        setBurgerConstructorModalOpen(!burgerConstructorModalOpen)
    }

    const handleMakeAnOrder = () => {
        setNoBunErr(false)
        setNoIngredientErr(false)
        if (!user) {
            history.push('/login')
            return
        }
        if (!selectedBun) {
            setNoBunErr(true)
            return
        }
        if (otherIngredients && otherIngredients.length === 0) {
            setNoIngredientErr(true)
            return
        }
        if (orderData) {
            dispatch(fetchOrder(orderData))
        }
        setBurgerConstructorModalOpen(true)
    }


    const [{isHover, isBunHover}, dropTargetRef] = useDrop<IIngredientWithUniqueId, unknown, IDragCollect>({
        accept: 'ingredient',
        collect: (monitor) => ({
            isHover: monitor.getItem()?.type !== 'bun' && monitor.isOver(),
            isBunHover: monitor.getItem()?.type === 'bun' && monitor.isOver()
        }),
        drop(item) {
            dispatch(addIngredientToCart({...item, dragId: uiv4()}))
        },
    })


    const moveCard = useCallback((dragIndex: number, hoverIndex: number): void => {
        const dragCard = otherIngredients[dragIndex];
        const newCards = [...otherIngredients]
        newCards.splice(dragIndex, 1)
        newCards.splice(hoverIndex, 0, dragCard)
        dispatch(updateIngredientsInConstructor(newCards))
    }, [otherIngredients, dispatch]);


    return (
        <section ref={dropTargetRef} className={`${styles.burgerConstructor} pt-25 pb-10`}>
            {selectedBun ? <div className={`pl-8`}>
                    <div className={`${isBunHover ? styles.borderBunTop : ''}`}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${selectedBun.name} (????????)`}
                            price={selectedBun.price}
                            thumbnail={selectedBun.image_mobile}
                        /></div>
                </div> :
                <div className={`${isBunHover && styles.borderBunTop} ${styles.noIngredient} ${styles.bunTop} ml-8`}>
                    <p className={`$text text_type_main-default`}>???????????????? ??????????????</p>
                </div>
            }
            {otherIngredients && otherIngredients.length > 0 ?
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
                :
                <div className={`${isHover && styles.borderIngredients} ${styles.noIngredient} ${styles.middle} ml-8`}>
                    <p className={`$text text_type_main-default`}>???????????????? ??????????????????????</p>
                </div>
            }

            {selectedBun ? <div className='pl-8'>
                    <div className={`${isBunHover ? styles.borderBunBot : ''}`}>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${selectedBun.name} (??????)`}
                            price={selectedBun.price}
                            thumbnail={selectedBun.image_mobile}
                        />
                    </div>
                </div> :
                <div className={`${isBunHover && styles.borderBunBot} ${styles.noIngredient} ${styles.bunBot} ml-8`}>
                    <p className={`$text text_type_main-default`}>???????????????? ??????????????</p>
                </div>}

            <div className={styles.price}>
                <div className={styles.currency}>
                    <p className={`${styles.text} text text_type_digits-medium`}>
                        {totalPrice}
                    </p>
                    <CurrencyIcon type="primary"/>
                </div>

                <Button onClick={handleMakeAnOrder} htmlType={'button'} type="primary" size="large" disabled={onLoad}>
                    ???????????????? ??????????
                </Button>

            </div>
            {
                onError &&
                <span className={`${styles.error} text text_type_main-default`}>??????, ?????????????????? ????????????! ?????????????????? ?????? ??????.</span>
            }
            {
                noBunErr &&
                <span className={`${styles.error} text text_type_main-default`}>???????????????? ??????????????</span>
            }
            {
                noIngredientErr &&
                <span className={`${styles.error} text text_type_main-default`}>???????????????? ?????????????? ???????? ????????????????????</span>
            }
            {burgerConstructorModalOpen && !onError &&
                <Modal onClose={toggleModal}>
                    <OrderDetails/>
                </Modal>
            }
        </section>
    )
}

export default BurgerConstructor;