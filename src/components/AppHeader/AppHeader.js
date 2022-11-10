import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css';
import {NavLink, useLocation, useRouteMatch} from 'react-router-dom'
import {useEffect} from "react";

function AppHeader() {
    const {path} = useRouteMatch()
    const {isExact} = useRouteMatch()
     const location = useLocation()


    return (
        <header className={styles.header}>
            <nav className={styles.content}>
                <div className={styles.container}>
                    <NavLink
                        className={`text text_type_main-default ${styles.link} pt-4 pb-4 pr-5 pl-6`}
                        activeClassName={styles.textActive}
                        exact to={{pathname: `/`}}>
                        <BurgerIcon type={'secondary'}/>
                        Конструктор
                    </NavLink>

                    <NavLink className={`text text_type_main-default ${styles.link} pt-4 pb-4 pr-5 pl-6`}
                             activeClassName={styles.textActive} to={{pathname: `/feed`}}>
                        <ListIcon type={'secondary'}/>
                        Лента заказов
                    </NavLink>
                </div>

                <Logo/>

                <NavLink className={`text text_type_main-default ${styles.link} pt-4 pb-4 pr-5 pl-6`}
                         activeClassName={styles.textActive} to={{pathname: `/profile`}}>
                    <ProfileIcon type={'secondary'}/>
                    Личный кабинет
                </NavLink>
            </nav>
        </header>
    );
};

export default AppHeader;


//TODO разместить лого по центру