import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../../components/AppHeader/AppHeader";
import styles from './ProfilePage.module.css'
import NavBar from "../../components/NavBar/NavBar";
import {useEffect, useRef, useState} from "react";
import {NameInput} from "../../components/NameInput/NameInput";
import {useDispatch, useSelector} from "react-redux";
import {getUserInfo} from "../../services/selectors/userSelector";
import {updateUserRequestSelector} from "../../services/selectors/updateUserSelectors";
import {updateUserInfo} from "../../services/slices/updateUserSlice";

const ProfilePage = () => {
    const ref = useRef()
    const dispatch = useDispatch()
    const {onLoad, onError, errorMessage} = useSelector(updateUserRequestSelector)
    const [change, setChange] = useState(false)
    const initialInput = useSelector(getUserInfo)
    const [state, setState] = useState({name: '', email: '', password: ''});

    useEffect(() => {
        setState({...initialInput, password: ''})
    }, [initialInput])

    const handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setState({
            ...state,
            [name]: value,
        });
        setChange(true)
    };

    const handleCancelChanges = () => {
        setChange(false)
        if (!initialInput) {
            return
        }
        setState({...initialInput, password: ''})
    }
    const handleSubmit = () => {
        dispatch(updateUserInfo(state))
        setChange(false)
    }

    return (
            <div className={`${styles.content}`}>
                <NavBar text={'В этом разделе вы можете изменить свои персональные данные'}>
                </NavBar>
                {!!initialInput && (<form ref={ref} className={styles.form}>
                    <NameInput name={'name'} value={state.name} onChange={handleInputChange} icon={"EditIcon"}/>
                    <EmailInput name={'email'} value={state.email} onChange={handleInputChange} placeholder={'Логин'}
                                icon={"EditIcon"} isIcon={true}/>
                    <PasswordInput name={'password'} value={state.password} onChange={handleInputChange}
                                    icon={"EditIcon"}/>

                    {change && (<div className={styles.buttons}>
                        <button
                            className={`${styles.cancelChanges} text text_type_main-default text_color_inactive`}
                            onClick={handleCancelChanges}>Отменить
                        </button>
                        <Button disabled={onLoad} htmlType={"button"} onClick={handleSubmit}>Сохранить</Button>
                    </div>)}
                    {onError && <span
                        className={`${styles.submitError} text text_type_main-small`}>{errorMessage}</span>}
                </form>)}
            </div>
    )
}
export default ProfilePage;