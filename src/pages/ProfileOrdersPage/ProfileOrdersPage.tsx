import styles from "./ProfileOrdersPage.module.css";
import NavBar from "../../components/NavBar/NavBar";

const ProfileOrdersPage = () => {

    return (
        <div className={`${styles.content}`}>
            <NavBar text={'В этом разделе вы можете посмотреть свои заказы'}/>
        </div>
    )
}
export default ProfileOrdersPage;