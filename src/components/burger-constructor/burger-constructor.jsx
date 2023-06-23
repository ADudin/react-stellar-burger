import styles from "./burger-constructor.module.css";
import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { 
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { Loader } from "../loader/loader";
import { removeItem } from "../../services/actions/burger-constructor";
import { sendOrder } from "../../services/actions/order";

function BurgerConstructor() {
  const [modalVisible, setModalVisible] = useState(false);

  const addedItems = useSelector(state => state.addedIngridients);
  const { orderRequest } = useSelector(state => state.order);
  const dispatch = useDispatch();
  const bun = addedItems.bun;
  const fillingComponents = addedItems.ingridients;

  const totalPrice = useMemo(() => {
    
    const fillingComponentsTotalPrice = fillingComponents.reduce((acc, item) => {
      return acc + item.price;
    }, 0);

    let bunPrice = 0;

    if (bun !== null) {
      bunPrice = bun.price;
    }

    return fillingComponentsTotalPrice + bunPrice;
  }, [addedItems]);

  const openModal = () => {
    const orderData = fillingComponents.map(item => item._id);
    
    if (bun !== null) {
      orderData.push(bun._id);
    }

    dispatch(sendOrder(orderData));
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
                <li className={styles.burgerConstructor__item} key={item.key} >
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
        { orderRequest ? <Loader size="large" inverse={true} /> : <OrderDetails />}
      </Modal>

    </section>
  );
}

export default BurgerConstructor;