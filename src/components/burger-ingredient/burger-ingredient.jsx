import styles from "./burger-ingredient.module.css";
import propTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";

import { 
  useState,
  useEffect
} from "react";

import {
  CurrencyIcon,
  Counter
} from '@ya.praktikum/react-developer-burger-ui-components';

import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";

function BurgerIngredient(props) {
  const { item, openModal } = props;
  const [count, setCount] = useState(0);
  const addedItem = { ...item, key: uuidv4()}
  const addedItems = useSelector(state => state.addedIngredients);

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: addedItem
  });

  useEffect(() => {
    if (item.type === 'bun' && addedItems.bun !== null && item._id === addedItems.bun._id) {
      setCount(1);
    }

    if (item.type === 'bun' && addedItems.bun !== null && item._id !== addedItems.bun._id) {
      setCount(0);
    }
    
    if (item.type !== 'bun') {
      return setCount(addedItems.ingredients.filter(ingredient => ingredient._id === item._id).length);
    };
  }, [addedItems, item._id, item.type]);
  
  return (
    <li ref={dragRef} key={item._id} className={styles.ingredients__item} 
      onClick={
        () => openModal(addedItem)
      }>
      <img src={item.image} alt={item.name} className="pr-4 pl-4"/>
      <div className={`${styles.ingredients__price} mt-1`}>
        <p className="text text_type_digits-default">{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.ingredients__paragraph} text text_type_main-default mt-1`}>{item.name}</p>
      {
        count !== 0 && <Counter count={count} size="default" />
      }
    </li>
  );
}

BurgerIngredient.propTypes = {
  item: ingredientPropType.isRequired,
  openModal: propTypes.func.isRequired
}

export default BurgerIngredient;