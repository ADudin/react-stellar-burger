import styles from "./burger-constructor.module.css";
import { useState, useContext, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { 
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

import { 
  BurgerIngridientsContext
} from "../../services/burger-constructor-context";

import { removeItem } from "../../services/actions/burger-constructor";

const orderPostUrl = 'https://norma.nomoreparties.space/api/orders';

function BurgerConstructor() {
  const [modalVisible, setModalVisible] = useState(false);
  const { addedIngridients } = useContext(BurgerIngridientsContext);

  const addedItems = useSelector(state => state.addedIngridients);
  const dispatch = useDispatch();

  const burgerComponents = addedIngridients;
  const bun = addedItems.bun;
  const fillingComponents = addedItems.ingridients;

  const [orderDataState, setOrderDataState] = useState({
    isLoading: false,
    hasError: false,
    orderDetails: {
      name: '',
      order: {
          number: 0
      },
      success: false
    }
  });

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
    
    const postOrderData = () => {

      const orderData = burgerComponents.map(item => item._id);
      if (bun !== 0) {
        orderData.push(bun._id);
      }

      setOrderDataState({ ...orderDataState, isLoading: true, hasError: false });
      
      fetch(orderPostUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ingredients: orderData
        })
      })
      .then(res => {
        if(res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then(res => setOrderDataState({ ...orderDataState, orderDetails: res, isLoading: false }))
      .catch(error => {
        console.log(error);
        setOrderDataState({ ...orderDataState, hasError: true, isLoading: false });
      })
    }

    postOrderData();
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
        <OrderDetails orderNumber={orderDataState.orderDetails.order.number} />
      </Modal>

    </section>
  );
}

export default BurgerConstructor;