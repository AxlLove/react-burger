import styles from "./ProfileOrdersPage.module.css";
import NavBar from "../../components/NavBar/NavBar";
import FeedCard from "../../components/FeedCard/FeedCard";
import {useAppDispatch, useAppSelector} from "../../services/hooks/hooks";
import {feedDataSelector, feedStatus} from "../../services/selectors/feedSelector";
import {useEffect} from "react";
import {connect, deleteOrderData, disconnect} from "../../services/slices/feedSlice";
import {ACCESS_TOKEN_NAME, WS_USER_URL} from "../../utils/constants";
import {getCookie} from "../../utils/coockie";
import {getUser} from "../../services/slices/getUserSlice";


const ProfileOrdersPage = () => {
    const dispatch = useAppDispatch()
    const data = useAppSelector(feedDataSelector)

    useEffect(() => {
        if(!getCookie(ACCESS_TOKEN_NAME)){
            return
        }
        dispatch(connect(`${WS_USER_URL}?token=${getCookie(ACCESS_TOKEN_NAME)}`))
        return () => {
            dispatch(disconnect())
            dispatch(deleteOrderData())
        }
    }, [dispatch])

    return (
        <div className={`${styles.content}`}>
            <NavBar text={'В этом разделе вы можете посмотреть свои заказы'}/>
            <ul className={styles.orders}>
                {data && data.orders && data.orders.map((order) => (
                    <FeedCard status={order.status} identifier={order.number} date={order.createdAt} name={order.name}
                              ingredients={order.ingredients} key={order.number}/>
                )).reverse()}
            </ul>
        </div>
    )
}
export default ProfileOrdersPage;