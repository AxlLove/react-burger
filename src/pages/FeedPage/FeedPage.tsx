import React, {useEffect} from "react";
import styles from './FeedPage.module.css';
import FeedCard from "../../components/FeedCard/FeedCard";
import {useAppDispatch} from "../../services/hooks/hooks";
import {connect} from "../../services/slices/feedSlice";

const  testOrder = [{
    ingredients: [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733c8",
        "60d3b41abdacab0026a733d0",
        "60d3b41abdacab0026a733d1"],
    _id: "",
    name: 'Супер бургер',
    status: "done",
    number: 123415,
    createdAt: "2021-06-23T14:43:22.587Z",
    updatedAt: "2021-06-23T14:43:22.603Z"
},
    {
        ingredients: [
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733c8",
            "60d3b41abdacab0026a733d0",
            "60d3b41abdacab0026a733d1",
            "60d3b41abdacab0026a733d1",
            "60d3b41abdacab0026a733d1",
            "60d3b41abdacab0026a733d1",
            "60d3b41abdacab0026a733d1"],
        _id: "",
        name: 'Супер бургер',
        status: "done",
        number: 213214,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z"
    },
    {
        ingredients: [
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733c8",
            "60d3b41abdacab0026a733d0",
            "60d3b41abdacab0026a733d1",
            "60d3b41abdacab0026a733d1",
            "60d3b41abdacab0026a733d1"],
        _id: "",
        name: 'Супер бургер',
        status: "done",
        number: 0,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z"
    },
    {
        ingredients: [
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733c8",
            "60d3b41abdacab0026a733d0",
            "60d3b41abdacab0026a733d1",
            "60d3b41abdacab0026a733d1",
            "60d3b41abdacab0026a733d1"],
        _id: "",
        name: 'Супер бургер',
        status: "done",
        number: 0,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z"
    },
    {
        ingredients: [
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733c8",
            "60d3b41abdacab0026a733d0",
            "60d3b41abdacab0026a733d1",
            "60d3b41abdacab0026a733d1",
            "60d3b41abdacab0026a733d1"],
        _id: "",
        name: 'Супер бургер',
        status: "done",
        number: 0,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z"
    },
    {
        ingredients: [
            "60d3b41abdacab0026a733c6",
            "60d3b41abdacab0026a733c8",
            "60d3b41abdacab0026a733d0",
            "60d3b41abdacab0026a733d1",
            "60d3b41abdacab0026a733d1",
            "60d3b41abdacab0026a733d1"],
        _id: "",
        name: 'Супер бургер',
        status: "done",
        number: 0,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z"
    }
]

const testOrderNumber = [`0o345334`,`0o345333`,`0o345534`,`0o3453s34`,`0o34a5334`,`0o345d334`,`0o3453f34`, `0o345a33`, `0o345a32`, `0o34d531`, `0os34530`, `0o34a532`, `0o34a532`,`0o34s532`,`0o34d532`,`0o3d4532`,`0o345d32`,`0o3453d2`,`0o3a4532`,`0o3453d2`,`0oa34532`]
const FeedPage: React.FC = () => {
    const dispatch = useAppDispatch()
    useEffect(()=> {
        dispatch(connect('wss://norma.nomoreparties.space/orders/all'))
    },[dispatch])
//TODO азвания классов - рука-лицо
    return (
        <main className={styles.feed}>
            <div className={styles.content}>
                <h2 className={`text text_type_main-large pt-10`}>Лента заказов</h2>
                <div className={styles.boxes}>
                    <ul className={`${styles.feedList}`}>
                        {testOrder.map((order)=>(
                            <FeedCard identifier={order.number} date={order.createdAt} name={order.name} ingredients={order.ingredients} key={order.number}/>
                        ))}
                    </ul>
                    <div className={styles.ordersStatus}>
                        <div className={styles.status}>
                            <div className={styles.container}>
                                <h2 className={`text text_type_main-medium`}>Готовы:</h2>
                                <ul className={styles.progress}>
                                    {testOrderNumber.slice(0, 20).map((item)=> (
                                        <li className={`${styles.progressDoneColor} text text_type_digits-default`}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className={styles.container}>
                                <h2 className={`text text_type_main-medium`}>В работе:</h2>
                                <div className={styles.progress}>
                                    {testOrderNumber.slice(0, 20).map((item)=> (
                                        <li className={`text text_type_digits-default`}>{item}</li>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.done}`}>
                            <h2 className={`text text_type_main-medium`}>Выполнено за все время:</h2>
                            <p className={`${styles.doneNumber} text text_type_digits-large`}>28 752</p>
                        </div>
                        <div className={`${styles.done}`}>
                            <h2 className={`text text_type_main-medium`}>Выполнено за сегодня:</h2>
                            <p className={`${styles.doneNumber} text text_type_digits-large`}>28 752</p>
                        </div>
                    </div>
                </div>


            </div>
        </main>
    )
}

export default FeedPage;