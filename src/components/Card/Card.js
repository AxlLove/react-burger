import styles from './Card.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";
import {useState} from "react";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

function Card({image, price, name, calories, carbohydrates, fat, proteins, image_large}) {
    const [isOpen, setIsOpen] = useState(false)

    const toggleModal = () => {
        setIsOpen(!isOpen)
    }
    const overlay = (
        <ModalOverlay toggleModal={toggleModal}/>
    )

    return (
        <li onClick={toggleModal} className={`${styles.card}`}>
            <Modal isOpen={isOpen} toggleModal={toggleModal} overlay={overlay}>
                <IngredientDetails name={name}
                                   calories={calories}
                                   image={image_large}
                                   carbohydrates={carbohydrates}
                                   fat={fat}
                                   proteins={proteins}/>
            </Modal>
            <Counter count={1} size="default"/>
            <img className={`${styles.image} pl-4 pr-5`} src={image} alt={name}/>
            <div className={`${styles.price} mt-1`}>
                <p className={`text text_type_digits-default ${styles.wordBreak}`}>{price}</p>
                <CurrencyIcon type={'primary'}/>
            </div>
            <p className={`text text_type_main-default pt-1 ${styles.wordBreak}`}>{name}</p>
        </li>
    )
}

Card.propTypes = {
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    image_large: PropTypes.string.isRequired
};

export default Card;
