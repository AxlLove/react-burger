import image from '../../images/done.png'
import styles from './OrderDetails.module.css'
import {useAppSelector} from '../../services/hooks/hooks';
import {constructorSubmitOrderSelector, orderNumberSelector} from '../../services/selectors/orderSelectors'

function OrderDetails() {
    const identifier = useAppSelector(orderNumberSelector)
    const {onLoad, onError} = useAppSelector(constructorSubmitOrderSelector)
    return (
        <div className={`${styles.orderDetails} pt-30 pb-30`}>
            {!onLoad ?
                <h2 className={`${styles.identifierHeader} ${styles.textColor} text text_type_digits-large`}>{identifier}</h2>
                :
                <h2 className={`${styles.identifierHeader} ${styles.textColor} text text_type_main-medium`}>Ваш заказ
                    готовится, дождитесь своего номера...</h2>
            }
            <p className={`${styles.textColor} text text_type_main-medium pt-8`}>идентификатор заказа</p>
            <img className={'pt-15'} src={image} alt={'done!'}/>
            <p className={`${styles.textColor} text text_type_main-default pt-15`}>Ваш заказ начали готовить</p>
            <p className={'text text_type_main-default text_color_inactive pt-2'}>Дождитесь готовности на орбитальной
                станции</p>
        </div>
    )
}


export default OrderDetails;