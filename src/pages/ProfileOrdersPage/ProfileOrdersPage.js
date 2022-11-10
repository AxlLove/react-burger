import styles from "../ProfilePage/ProfilePage.module.css";
import NavBar from "../../components/NavBar/NavBar";


const ProfileOrdersPage = () => {

    return (
        <div className={`${styles.content}`}>
            <NavBar text={'В этом разделе вы можете изменить свои заказы'}>
            </NavBar>
        </div>
    )
}
export default ProfileOrdersPage;