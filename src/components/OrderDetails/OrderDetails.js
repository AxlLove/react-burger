import image from '../../images/done.png'
import styles from './OrderDetails.module.css'
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';

function OrderDetails() {
    const identifier = useSelector(store=> store.ingredients.orderDitails.order)


    return (
        <div className={`${styles.orderDetails} pt-30 pb-30`}>
            { identifier.number && 
                        <h2 className={`${styles.identifierHeader} ${styles.textColor} text text_type_digits-large`}>{identifier.number}</h2>

            }
            <p className={`${styles.textColor} text text_type_main-medium pt-8`}>идентификатор заказа</p>
            <img className={'pt-15'} src={image} alt={'done!'}/>
            <p className={`${styles.textColor} text text_type_main-default pt-15`}>Ваш заказ начали готовить</p>
            <p className={'text text_type_main-default text_color_inactive pt-2'}>Дождитесь готовности на орбитальной
                станции</p>
        </div>
    )
}

OrderDetails.propTypes = {
    identifier: PropTypes.number.isRequired,
}

export default OrderDetails;