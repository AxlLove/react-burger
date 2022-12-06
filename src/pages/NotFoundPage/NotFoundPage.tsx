import {Link} from "react-router-dom";
import styles from './NotFoundPage.module.css'

function NotFoundPage() {
    return (
        <div className={styles.page}>
            <h2 className={`${styles.header} text text_type_main-large`}>404</h2>
            <p className={`${styles.message} text text_type_main-medium`}>Страница не найдена</p>
            <Link to="/" className={`${styles.link} text text_type_main-default text_color_inactive`}>На главную</Link>
        </div>

    )
}

export default NotFoundPage;