import styles from "./NavBar.module.css";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logoutUser} from "../../services/slices/logoutUserSlice";
import {FC} from "react";

interface INavBarProps {
    text: string;
}

const NavBar: FC<INavBarProps> = ({text}) => {
    const dispatch = useDispatch()
    const logOut = () => {
        // @ts-ignore
        dispatch(logoutUser())
    }

    return (
        <ul className={`${styles.links}`}>
            <NavLink className={`${styles.link} text text_type_main-medium`} activeClassName={styles.activeLink} exact
                     to={'/profile'}>Профиль</NavLink>
            <NavLink className={`${styles.link} text text_type_main-medium`} activeClassName={styles.activeLink} exact
                     to={'/profile/orders'}>История заказов</NavLink>
            <button className={`${styles.link} ${styles.linkTypeButton} text text_type_main-medium`}
                    onClick={logOut}>Выход
            </button>
            <p className={`${styles.description} pt-20 text text_type_main-small text_color_inactive`}>{text}</p>
        </ul>
    )
}

export default NavBar