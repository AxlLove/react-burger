import styles from './ModalOverlay.module.css'
import React, {FC} from "react";

interface IModalOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
    onClose?: () => void
}

const ModalOverlay: FC<IModalOverlayProps> = ({onClose}) => {

    return (
        <div className={styles.modalOverlay} onClick={onClose}/>
    )
}


export default ModalOverlay