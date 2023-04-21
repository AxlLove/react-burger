import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css';
import {NavLink} from 'react-router-dom'
import {useAppSelector} from "../../services/hooks/hooks";
import {getWidthSelector} from "../../services/selectors/widthSelector";
import HeaderDesktop from "./HeaderDesktop";

function AppHeader() {
    const isMobile = useAppSelector(getWidthSelector)

    return (
        <header className={styles.header}>
            {isMobile &&
                <HeaderDesktop></HeaderDesktop>
            }
        </header>
    );
}

export default AppHeader;
