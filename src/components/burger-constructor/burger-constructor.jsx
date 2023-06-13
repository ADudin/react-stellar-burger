import styles from "./burger-constructor.module.css";
import { useState, useContext } from "react";

import { 
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

import { 
  BurgerIngridientsContext,
  BunIngridientContext
} from "../../services/burger-constructor-context";

const getTotalPrice = (items) => {
  let totalPrice = 0;
  items.forEach((item) => {
    totalPrice = totalPrice + item.price;
  });

  return totalPrice;
}

function BurgerConstructor() {
  const [modalVisible, setModalVisible] = useState(false);
  const { addedIngridients } = useContext(BurgerIngridientsContext);
  const { addedBun } = useContext(BunIngridientContext);

  const burgerComponents = addedIngridients;
  const bun = addedBun;

  const fillingComponents = burgerComponents.filter(item => item.type !== 'bun');
  const totalPrice = bun === null ? getTotalPrice(burgerComponents) : getTotalPrice(burgerComponents) + bun.price;

  const openModal = () => {
    setModalVisible(true);
  }

  const closeModal = () => {
    setModalVisible(false);
  }

  return (
    <section className={styles.burgerConstructor}>

      <div className={`${styles.burgerConstructor__container} mt-25 pl-4`}>

        {
          bun && <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
          extraClass="mb-1 ml-8"
          />
        }

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

        {
          bun && <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
          extraClass="mt-1 ml-8"
          />
        }

        <div className={`${styles.burgerConstructor__info} mt-9 pr-4`}>
          <div className={`${styles.burgerConstructor__price} mr-10`}>
            <p className="text text_type_digits-medium">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button onClick={openModal} htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </div>

      </div>

      <Modal modalActive={modalVisible} closeModal={closeModal}>
        <OrderDetails />
      </Modal>

    </section>
  );
}

export default BurgerConstructor;