import styles from "./NavBar.module.css";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logoutUser} from "../../services/slices/userSlice";

const NavBar = () => {
    const dispatch = useDispatch()
    const logOut = () => {
        dispatch(logoutUser())
    }

    return (
        <ul className={styles.links}>
            <NavLink className={`${styles.link} text text_type_main-medium`} activeClassName={styles.activeLink} exact to={'/profile'}>Профиль</NavLink>
            <NavLink className={`${styles.link} text text_type_main-medium`} activeClassName={styles.activeLink} exact to={'/profile/order'}>История заказов</NavLink>
            <button className={`${styles.link} text text_type_main-medium`} style={{border: "none", background: "none"}} onClick={logOut}>Выход</button>
        </ul>
    )
}

export default NavBar