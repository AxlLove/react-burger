import styles from './ModalOverlay.module.css'
import PropTypes from "prop-types";
import Card from "../Card/Card";

function ModalOverlay({toggleModal}) {

    return (
        <div className={styles.modalOverlay} onClick={() => {
            toggleModal()
        }}/>
    )
}

ModalOverlay.propTypes = {
    toggleModal: PropTypes.func.isRequired
};

export default ModalOverlay