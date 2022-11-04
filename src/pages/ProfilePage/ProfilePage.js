import Form from "../../components/Form/Form";
import {EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../../components/AppHeader/AppHeader";
import styles from './ProfilePage.module.css'
import NavBar from "../../components/NavBar/NavBar";
import {useState} from "react";
import {NameInput} from "../../components/NameInput/NameInput";

const ProfilePage = () => {
    const [value, setValue] = useState('password')
    const onChange = e => {
        setValue(e.target.value)
    }
    return (
        <>
            <AppHeader/>
            <div className={`${styles.content}`}>
                <div className={`${styles.navigation} pr-15`}>
                    <NavBar/>
                    <p className={`${styles.description} pt-20 text text_type_main-small text_color_inactive`}>В этом разделе вы можете
                        изменить свои персональные данные</p>
                </div>
                <form className={styles.form}>
                    <NameInput  icon={"EditIcon"} />
                    <EmailInput value={value} onChange={onChange} placeholder={'Логин'} isIcon={true}/>
                    <PasswordInput  icon={"EditIcon"}/>

                </form>
            </div>
        </>


    )
}
export default ProfilePage;