import styles from './Modal.module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom"
import {useEffect, useState} from "react";
import PropTypes from "prop-types";

const modalRoot = document.getElementById('react-modals')

function Modal({isOpen, toggleModal, children, overlay}) {

    useEffect(() => {
        const closeModalPressEsc = (e) => {
            if (e.key === 'Escape') {
                toggleModal()
            }
        }
        if (isOpen) {
            document.addEventListener('keyup', closeModalPressEsc)
            return () => {
                document.removeEventListener('keyup', closeModalPressEsc)
            }
        }
    }, [isOpen])


    return ReactDOM.createPortal(
        <>
            {
                isOpen &&
                <>
                    {overlay}
                    <div className={styles.modal} onClick={event => event.stopPropagation()}>
                        <button className={styles.button} type={"button"} onClick={toggleModal}>
                            <CloseIcon type="primary"/>
                        </button>
                        {children}
                    </div>
                </>

            }
        </>
        ,
        modalRoot
    )
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
    children: PropTypes.element,
    overlay: PropTypes.element,
};

export default Modal