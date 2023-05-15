import styles from "./burger-constructor.module.css";
import propTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";

import { 
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';

const getTotalPrice = (items) => {
  let totalPrice = 0;
  items.forEach((item) => {
    totalPrice = totalPrice + item.price;
  });

  return totalPrice;
}

function BurgerConstructor(props) {
  const burgerComponents = props.data;

  const bun = burgerComponents.find(item => item.type === 'bun');
  const fillingComponents = burgerComponents.filter(item => item.type !== 'bun');

  const totalPrice = getTotalPrice(burgerComponents);

  return (
    <section className={styles.burgerConstructor}>

      <div className={`${styles.burgerConstructor__container} mt-25 pl-4`}>

        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
          extraClass="mb-1 ml-8"
        />

        <ul className={`${styles.burgerConstructor__list} custom-scroll`}>
          {
            fillingComponents.map(item => {
              return (
                <li className={styles.burgerConstructor__item} key={item._id}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </li>
              )
            })
          }
        </ul>

        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
          extraClass="mt-1 ml-8"
        />

        <div className={`${styles.burgerConstructor__info} mt-9 pr-4`}>
          <div className={`${styles.burgerConstructor__price} mr-10`}>
            <p className="text text_type_digits-medium">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </div>

      </div>

    </section>
  )
}

BurgerConstructor.propTypes = {
  data: propTypes.arrayOf(ingredientPropType)
}

export default BurgerConstructor;