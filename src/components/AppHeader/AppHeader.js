import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css';



function AppHeader() {
    return(
        <header className={styles.header}>
                <nav className={styles.content}>
                    <div className={styles.container}>
                        <a className={`${styles.link} pt-4 pb-4 pr-5 pl-6`}  href={'#'}>
                            <BurgerIcon type='primary'/>
                            <p className ={`${styles.textActive} text text_type_main-default pl-2`} >Конструктор</p>
                        </a>

                        <a className={`${styles.link} pt-4 pb-4 pr-5 pl-6`} href={'#'}>
                            <ListIcon type="secondary" />
                            <p className={`${styles.text} text text_type_main-default pl-2`}>Лента заказов</p>
                        </a>
                    </div>

                    <Logo/>

                    <a className={`${styles.link} pt-4 pb-4 pr-5 pl-6`} href={'#'}>
                        <ProfileIcon type="secondary" />
                        <p className={`${styles.text} text text_type_main-default pl-2`}>Личный кабинет</p>
                    </a>
                </nav>
        </header>
    );
};

export default AppHeader;