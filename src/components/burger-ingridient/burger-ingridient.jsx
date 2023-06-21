import styles from "./burger-ingridient.module.css";
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
import { addItem, removeItem } from "../../services/actions/burger-constructor";
import { useSelector, useDispatch } from "react-redux";

function BurgerIngridient(props) {
  const { item, openModal } = props;
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();
  const addedItems = useSelector(state => state.addedIngridients);

  const addIngridient = (item) => {
    const addedItem = { ...item, key: uuidv4()}

    if (addedItem.type === 'bun' && addedItems.bun !== null) {
      dispatch(removeItem(addedItems.bun));
    }
    
    dispatch(addItem(addedItem));
    openModal(addedItem);
  }

  useEffect(() => {
    if (item.type === 'bun' && addedItems.bun !== null && item._id === addedItems.bun._id) {
      setCount(1);
    }

    if (item.type === 'bun' && addedItems.bun !== null && item._id !== addedItems.bun._id) {
      setCount(0);
    }
    
    if (item.type !== 'bun') {
      return setCount(addedItems.ingridients.filter(ingridient => ingridient._id === item._id).length);
    };
  }, [addedItems, item._id, item.type]);
  
  return (
    <li key={item._id} className={styles.ingridients__item} 
      onClick={
        () => addIngridient(item)
      }>
      <img src={item.image} alt={item.name} className="pr-4 pl-4"/>
      <div className={`${styles.ingridients__price} mt-1`}>
        <p className="text text_type_digits-default">{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.ingridients__paragraph} text text_type_main-default mt-1`}>{item.name}</p>
      {
        count !== 0 && <Counter count={count} size="default" />
      }
    </li>
  );
}

BurgerIngridient.propTypes = {
  item: ingredientPropType.isRequired,
  openModal: propTypes.func.isRequired
}

export default BurgerIngridient;