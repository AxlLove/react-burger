import styles from './Modal.module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom"
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

const modalRoot = document.getElementById('react-modals')

function Modal({toggleModal, children}) {

    useEffect(() => {
        const closeModalPressEsc = (e) => {
            if (e.key === 'Escape') {
                toggleModal()
            }
        }
            document.addEventListener('keyup', closeModalPressEsc)
            return () => {
                document.removeEventListener('keyup', closeModalPressEsc)
            }
    }, [toggleModal])


    return ReactDOM.createPortal(
        <>
                <>
                    <ModalOverlay toggleModal={toggleModal}/>
                    <div className={styles.modal} onClick={event => event.stopPropagation()}>
                        <button className={styles.button} type={"button"} onClick={toggleModal}>
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
    toggleModal: PropTypes.func.isRequired,
    children: PropTypes.element,
    overlay: PropTypes.element,
};

export default Modal