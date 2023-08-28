import styles from "./burger-ingredient.module.css";

import { 
  useState,
  useEffect,
  FC
} from "react";

import {
  CurrencyIcon,
  Counter
} from '@ya.praktikum/react-developer-burger-ui-components';
// @ts-ignore
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "../../services/types/hooks";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { IIngredient } from "../../services/types/inrgedient-type";

interface IIngredientComponent {
  item: IIngredient;
};

const BurgerIngredient: FC<IIngredientComponent> = ({ item }) => {
  const [count, setCount] = useState(0);
  const addedItem = { ...item, key: uuidv4()}
  const addedItems = useSelector(state => state.addedIngredients);

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: addedItem
  });

  const location = useLocation();
  const ingredientId = item['_id'];

  useEffect(() => {
    if (item.type === 'bun' && addedItems.bun !== null && item._id === addedItems.bun._id) {
      setCount(1);
    }

    if (item.type === 'bun' && addedItems.bun !== null && item._id !== addedItems.bun._id) {
      setCount(0);
    }

    if (item.type === 'bun' && addedItems.bun === null) {
      setCount(0);
    }
    
    if (item.type !== 'bun') {
      return setCount(addedItems.ingredients.filter(ingredient => ingredient._id === item._id).length);
    };
  }, [addedItems, item._id, item.type]);
  
  return (
    <li ref={dragRef} key={item._id}>
      <Link
        key={ingredientId}
        // Тут мы формируем динамический путь для нашего ингредиента
        to={`/ingredients/${ingredientId}`}
        // а также сохраняем в свойство background роут,
        // на котором была открыта наша модалка
        state={{ background: location }}
        className={styles.ingredients__item}
      >
        <img src={item.image} alt={item.name} className="pr-4 pl-4"/>
        <div className={`${styles.ingredients__price} mt-1`}>
          <p className="text text_type_digits-default">{item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.ingredients__paragraph} text text_type_main-default mt-1`}>{item.name}</p>
        {
          count !== 0 && <Counter count={count} size="default" />
        }
      </Link>
    </li>
  );
}

export default BurgerIngredient;