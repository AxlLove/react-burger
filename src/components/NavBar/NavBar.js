import styles from "./NavBar.module.css";
import {NavLink} from "react-router-dom";

const NavBar = () => {
    return (
        <ul className={styles.links}>
            <NavLink className={`${styles.link} text text_type_main-medium`} activeClassName={styles.activeLink} exact to={'/profile'}>Профиль</NavLink>
            <NavLink className={`${styles.link} text text_type_main-medium`} activeClassName={styles.activeLink} exact to={'/profile/order'}>История заказов</NavLink>
            <NavLink className={`${styles.link} text text_type_main-medium`} activeClassName={styles.activeLink} exact to={'/profile/order/:id'}>Выход</NavLink>
        </ul>
    )
}

export default NavBar