import styles from "./burger-constructor-ingredient.module.css";

import { 
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useDispatch } from "react-redux";
import { useRef, FC } from "react";
import { useDrag, useDrop } from "react-dnd";
import { moveItem } from "../../services/actions/burger-constructor";
import { IIngredient } from "../../services/types/inrgedient-type";

type TBurgerConstructorIngredient = {
  item: IIngredient;
  index: number;
  removeItem: (item: IIngredient) => void;
};

type TDragItem = {
  name: string;
  type: string;
  index: number
}

const BurgerConstructorIngredient: FC<TBurgerConstructorIngredient> = ({ item, index, removeItem }) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLLIElement>(null);

  const [, dropTarget] = useDrop({
    accept: 'constructor ingredient',
    hover(item: TDragItem, monitor) {
      if (!ref.current) {
        return
      }
      
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(moveItem({dragIndex, hoverIndex}));
      item.index = hoverIndex;
    }
  });

  const [{isDragging}, dragItem] = useDrag({
    type: 'constructor ingredient',
    item: () => {
      return {item: item.key, index};
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;
  dragItem(dropTarget(ref));

  return (
    <li ref={ref} className={styles.burgerConstructor__item} key={item.key} style={{opacity}} >
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => {
          dispatch(removeItem(item));
        }}
      />
    </li>
  );
};

export default BurgerConstructorIngredient;