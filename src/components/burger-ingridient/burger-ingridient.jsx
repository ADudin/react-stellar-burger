import styles from "./burger-ingridient.module.css";
import propTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";

import { 
  useState,
  useContext,
  useEffect
 } from "react";

import {
  CurrencyIcon,
  Counter
} from '@ya.praktikum/react-developer-burger-ui-components';

import { BunIngridientContext } from "../../services/burger-constructor-context";

function BurgerIngridient(props) {
  const { item, openModal } = props;
  const [count, setCount] = useState(0);

  const { addedBun } = useContext(BunIngridientContext);

  useEffect(() => {
    if (
      item.type === 'bun' && 
      addedBun !== null && 
      item._id !== addedBun._id) {
        setCount(0);
    }
  }, [addedBun]);

  const addIngridient = (item) => {
    openModal(item);
    if (item.type === 'bun') {
      setCount(1);
    } else {
      setCount(count + 1);
    }
  }
  
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
  item: ingredientPropType,
  openModal: propTypes.func
}

export default BurgerIngridient;