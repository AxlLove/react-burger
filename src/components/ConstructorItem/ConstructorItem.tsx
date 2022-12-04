import styles from './ConstructorItem.module.css'
import { useAppDispatch } from '../../services/hooks/hooks';
import {constructorSlice} from "../../services/slices/burgerConstructorSlice";
import {DragIcon, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import React, {FC, useRef} from 'react'
import {useDrop, useDrag} from 'react-dnd'
import {IIngredientWithUniqueId} from "../../types/types";

interface IConstructorItem {
    dragId: string;
    index: number;
    item: IIngredientWithUniqueId;
    moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface ICollectProps {
    handlerId: string | null | symbol;
}

const ConstructorItem: FC<IConstructorItem> = ({dragId, index, item, moveCard}) => {
    const {price, name, image_mobile} = item
    const dispatch = useAppDispatch()

    const deleteIngredient = (id: string) => {
        dispatch(constructorSlice.actions.deleteIngredient(id))
    }
    const ref = useRef<HTMLLIElement>(null);
    const [{handlerId}, drop] = useDrop<IConstructorItem, unknown, ICollectProps>({
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

            if (typeof clientOffset?.y !== 'number') {
                return;
            }
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
        item: () => ({id: item._id, index}),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    if (item.type !== 'bun') drag(drop(ref));
    const preventDefault = (e: React.DragEvent<HTMLLIElement>) => e.preventDefault();

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


export default ConstructorItem