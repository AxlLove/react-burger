import styles from './ModalOverlay.module.css'
import PropTypes from "prop-types";

function ModalOverlay({onClose}) {

    return (
        <div className={styles.modalOverlay} onClick={onClose}/>
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func
};

export default ModalOverlay