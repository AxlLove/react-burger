import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader() {
    return(
        <header>
            <nav>
                <link>
                    <BurgerIcon type='primary'/>
                    <p>Конструктор</p>
                </link>
                <link>
                    <ListIcon type="primary" />
                    <p>Лента заказов</p>
                </link>
            </nav>
            <Logo/>
            <link>
                <ProfileIcon type="primary" />
                <p>Личный кабинет</p>
            </link>
        </header>
    );
};

export default AppHeader;