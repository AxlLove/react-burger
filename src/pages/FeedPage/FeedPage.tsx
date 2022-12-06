import React, {useEffect} from "react";
import styles from './FeedPage.module.css';
import FeedCard from "../../components/FeedCard/FeedCard";

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
const testOrderNumber = [`0o345334`,`0o345334`,`0o345334`,`0o345334`,`0o345334`,`0o345334`,`0o345334`, `0o34533`, `0o34532`, `0o34531`, `0o34530`, `0o34532`, `0o34532`,`0o34532`,`0o34532`,`0o34532`,`0o34532`,`0o34532`,`0o34532`,`0o34532`,`0o34532`]
const FeedPage: React.FC = () => {

    return (
        <main className={styles.feed}>
            <div className={styles.content}>
                <h2 className={`text text_type_main-large pt-10`}>Лента заказов</h2>
                <div className={styles.boxes}>
                    <ul className={`${styles.feedList}`}>
                        {testOrder.map((order)=>(
                            <FeedCard identifier={order.number} date={order.createdAt} name={order.name} ingredients={order.ingredients}/>
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