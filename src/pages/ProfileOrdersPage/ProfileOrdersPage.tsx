import styles from "./ProfileOrdersPage.module.css";
import NavBar from "../../components/NavBar/NavBar";
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

const ProfileOrdersPage = () => {

    return (
        <div className={`${styles.content}`}>
            <NavBar text={'В этом разделе вы можете посмотреть свои заказы'}/>
            <ul className={styles.orders}>
            {testOrder.map((order)=>(
                            <FeedCard status={`Выполнен`} identifier={order.number} date={order.createdAt} name={order.name} ingredients={order.ingredients} key={order.number}/>
                        ))}
            </ul>
        </div>
    )
}
export default ProfileOrdersPage;