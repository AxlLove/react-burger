import styles from './ConstructorItem.module.css'
import {useDispatch} from 'react-redux'
import {constructorSlice} from "../../services/slices/burgerConstructorSlice";
import {DragIcon, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import {useRef} from 'react'
import {useDrop, useDrag} from 'react-dnd'
import {ingredientType} from "../../utils/types";
import PropTypes from "prop-types";


const ConstructorItem = ({dragId, index, item, moveCard}) => {
    const {price, name, image_mobile} = item
    const dispatch = useDispatch()
    const deleteIngredient = (id) => {
        dispatch(constructorSlice.actions.deleteIngredient(id))
    }
    const ref = useRef(null);
    const [{handlerId}, drop] = useDrop({
        accept: 'component',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    })
    const [{isDragging}, drag] = useDrag({
        type: 'component',
        item: () => ({id: item.id, index}),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    if (item.type !== 'bun') drag(drop(ref));
    const preventDefault = (e) => e.preventDefault();

    return (
        <li ref={ref} onDrop={preventDefault} style={{opacity}} data-handler-id={handlerId}
            className={`${styles.constructorItem} ${isDragging ? styles.dragging : ''}`}>
            <DragIcon type="primary"/>
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image_mobile}
                handleClose={() => {
                    deleteIngredient(dragId)
                }}
            />

        </li>
    )
}
ConstructorItem.propTypes = {
    item: ingredientType.isRequired,
    moveCard: PropTypes.func.isRequired,
    dragId: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired
};

export default ConstructorItem