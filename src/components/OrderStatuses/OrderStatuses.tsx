import { useAppSelector } from '../../services/hooks/hooks';
import { feedOrderDoneSelector, feedOrderPendingSelector } from '../../services/selectors/feedSelector';
import styles from './OrderStatuses.module.css'


interface IOrderStatuses {
    total: number | undefined;
    totalToday: number | undefined;
}

const OrderStatuses: React.FC<IOrderStatuses> = ({total, totalToday}) => {
const doneOrders = useAppSelector(feedOrderDoneSelector)
const pendingOrders = useAppSelector(feedOrderPendingSelector)
    return (
        <div className={styles.ordersStatus}>
        <div className={styles.status}>
            <div className={styles.container}>
                <h2 className={`text text_type_main-medium`}>Готовы:</h2>
                <ul className={styles.progress}>
                    {doneOrders && doneOrders.slice(0, 20).map((item)=> (
                        <li className={`${styles.progressDoneColor} text text_type_digits-default`} key={item}>{item}</li>
                    ))}
                </ul>
            </div>
            <div className={styles.container}>
                <h2 className={`text text_type_main-medium`}>В работе:</h2>
                <div className={styles.progress}>
                    {pendingOrders && pendingOrders.slice(0, 20).map((item)=> (
                        <li className={`text text_type_digits-default`} key={item}>{item}</li>
                    ))}
                </div>
            </div>
        </div>
        <div className={`${styles.done}`}>
            <h2 className={`text text_type_main-medium`}>Выполнено за все время:</h2>
            <p className={`${styles.doneNumber} text text_type_digits-large`}>{total}</p>
        </div>
        <div className={`${styles.done}`}>
            <h2 className={`text text_type_main-medium`}>Выполнено за сегодня:</h2>
            <p className={`${styles.doneNumber} text text_type_digits-large`}>{totalToday}</p>
        </div>
    </div>
    )
}

export default OrderStatuses;