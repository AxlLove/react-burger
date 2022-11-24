import styles from './Modal.module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom"
import React, {FC, useEffect} from "react";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

const modalRoot = document.getElementById('react-modals') as Element

interface IModalProps extends React.HTMLAttributes<HTMLElement>{
    onClose?: () => void;
}
const Modal: FC<IModalProps> = ({onClose, children}) => {
    useEffect(() => {
        const closeModalPressEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && onClose) {
                onClose()
            }
        }
            document.addEventListener('keyup', closeModalPressEsc)
            return () => {
                document.removeEventListener('keyup', closeModalPressEsc)
            }
    }, [onClose])


    return ReactDOM.createPortal(
        <>
                    <ModalOverlay onClose={onClose}/>
                    <div className={styles.modal} onClick={event => event.stopPropagation()}>
                        <button className={styles.button} type={"button"} onClick={onClose}>
                            <CloseIcon type="primary"/>
                        </button>
                        {children}
                    </div>
        </>
        ,
        modalRoot
    )
}


export default Modal