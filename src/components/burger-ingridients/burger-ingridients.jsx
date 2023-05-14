import styles from "./burger-ingridients.module.css";
import { useState } from "react";
import propTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";

import { 
  Tab,
  CurrencyIcon,
  Counter
} from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngridients(props) {
  const [current, setCurrent] = useState('one');
  
  const ingridients = props.data; 
  
  const buns = ingridients.filter(item => item.type === 'bun');
  const sauces = ingridients.filter(item => item.type === 'sauce');
  const mains = ingridients.filter(item => item.type === 'main');

  const renderCounter = (evt) => {
    const element = evt.target.closest('li');
    const counter = element.querySelector('.counter');
    
    counter.classList.remove(styles.ingridients__hidden);
  }

  const renderElement = (element) => {

    return (
      <li key={element._id} className={styles.ingridients__item} onClick={(evt) => renderCounter(evt)}>
        <img src={element.image} alt={element.name} className="pr-4 pl-4"/>
        <div className={`${styles.ingridients__price} mt-1`}>
          <p className="text text_type_digits-default">{element.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.ingridients__paragraph} text text_type_main-default mt-1`}>{element.name}</p>
        <Counter count={1} size="default" extraClass={styles.ingridients__hidden} />
      </li>
    );
  }

  return (
    <section className={styles.ingridients}>

      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>

      <div className={`${styles.ingridients__tabs} mt-5`}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      <ul className={`${styles.ingridients__types} mt-10 custom-scroll`}>

        <li>
          <p className="text text_type_main-medium">Булки</p>
          <ul className={`${styles.ingridients__items} pt-6 pr-4 pl-4`}>
            {buns.map(item => renderElement(item))}
          </ul>
        </li>

        <li className="mt-10">
          <p className="text text_type_main-medium">Соусы</p>
          <ul className={`${styles.ingridients__items} pt-6 pr-4 pl-4`}>
            {sauces.map(item => renderElement(item))}
          </ul>
        </li>

        <li className="mt-10">
          <p className="text text_type_main-medium">Начинки</p>
          <ul className={`${styles.ingridients__items} pt-6 pr-4 pl-4`}>
            {mains.map(item => renderElement(item))}
          </ul>
        </li>

      </ul>

    </section>
  );
}

BurgerIngridients.propTypes = {
  data: propTypes.arrayOf(ingredientPropType)
}

export default BurgerIngridients;