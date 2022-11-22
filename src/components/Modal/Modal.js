import styles from './Modal.module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom"
import {useEffect} from "react";
import PropTypes from "prop-types";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

const modalRoot = document.getElementById('react-modals')

function Modal({onClose, children}) {
    useEffect(() => {
        const closeModalPressEsc = (e) => {
            if (e.key === 'Escape') {
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
                <>
                    <ModalOverlay onClose={onClose}/>
                    <div className={styles.modal} onClick={event => event.stopPropagation()}>
                        <button className={styles.button} type={"button"} onClick={onClose}>
                            <CloseIcon type="primary"/>
                        </button>
                        {children}
                    </div>
                </>
        </>
        ,
        modalRoot
    )
}

Modal.propTypes = {
    children: PropTypes.element,
    onClose: PropTypes.func
};

export default Modal