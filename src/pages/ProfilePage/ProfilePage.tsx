import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ProfilePage.module.css'
import NavBar from "../../components/NavBar/NavBar";
import {ChangeEvent, SyntheticEvent, useEffect, useRef, useState} from "react";
import {NameInput} from "../../components/NameInput/NameInput";
import {useDispatch, useSelector} from "react-redux";
import {getUserInfo} from "../../services/selectors/userSelector";
import {updateUserRequestSelector} from "../../services/selectors/updateUserSelectors";
import {updateUserInfo} from "../../services/slices/updateUserSlice";
import {useForm} from "../../hooks/useForm";

const ProfilePage = () => {
    const ref = useRef<HTMLFormElement>(null)
    const dispatch = useDispatch()
    const {onLoad, onError, errorMessage} = useSelector(updateUserRequestSelector)
    const [change, setChange] = useState(false)
    const initialInput = useSelector(getUserInfo)

    const {formValues, handleChange, setFormValues} = useForm({
        name: "",
        email: '',
        password: '',
    })
    useEffect(() => {
        setFormValues({...initialInput, password: ''})
    }, [initialInput, setFormValues])

    const handleProfileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setChange(true)
        handleChange(event)
    }

    const handleCancelChanges = () => {
        setChange(false)
        if (!initialInput) {
            return
        }
        setFormValues({...initialInput, password: ''})
    }
    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault()
        // @ts-ignore
        dispatch(updateUserInfo(formValues))
        setChange(false)
    }

    return (
        <div className={`${styles.content}`}>
            <NavBar text={'В этом разделе вы можете изменить свои персональные данные'}/>
            {!!initialInput && (<form ref={ref} className={styles.form} onSubmit={handleSubmit}>
                <NameInput name={'name'} value={formValues.name} onChange={handleProfileInputChange} icon={"EditIcon"}/>
                <EmailInput name={'email'} value={formValues.email} onChange={handleProfileInputChange} placeholder={'Логин'}
                            isIcon={true}/>
                <PasswordInput name={'password'} value={formValues.password} onChange={handleProfileInputChange}
                               icon={"EditIcon"}/>

                {change && (<div className={styles.buttons}>
                    <button
                        className={`${styles.cancelChanges} text text_type_main-default text_color_inactive`}
                        onClick={handleCancelChanges}>Отменить
                    </button>
                    <Button disabled={onLoad} htmlType={"submit"}>Сохранить</Button>
                </div>)}
                {onError && <span
                    className={`${styles.submitError} text text_type_main-small`}>{errorMessage}</span>}
            </form>)}
        </div>
    )
}
export default ProfilePage;