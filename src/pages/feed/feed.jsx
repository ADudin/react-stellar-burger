import styles from "./feed.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { wsOrdersUrl } from "../../utils/data";
import { wsConnect, wsDisconnect } from "../../services/actions/order-feed";

import OrderCard from "../../components/order-card/order-card";

const orderData = {
  "ingredients": [
    "60d3463f7034a000269f45e7",
    "60d3463f7034a000269f45e9",
    "60d3463f7034a000269f45e8",
    "60d3463f7034a000269f45ea"
  ],
  "_id": "",
  "status": "done",
  "number": "034535",
  "createdAt": "2021-06-23T14:43:22.587Z",
  "updatedAt": "2021-06-23T14:43:22.603Z"
};

function Feed() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnect(wsOrdersUrl));
    return () => {
      dispatch(wsDisconnect());
    }
  }, [dispatch]);

  const orders = useSelector(state => state.orderFeed);
  console.log(orders);

  return (
    <main className={`${styles.main} pb-15`}>

      <h1 className={`${styles.main__title} text text_type_main-large mt-10`}>Лента заказов</h1>

      <ul className={`${styles.list} custom-scroll`}>
        <OrderCard orderData={orderData} />
      </ul>

      <div className={styles.stats}>

        <div className={styles.ordersBoard}>

          <div className={styles.done}>
            <p className="text text_type_main-medium mb-6">Готовы:</p>
            <ul className={styles.ordersBoard__list}>
              <li className={`${styles.ordersBoard__doneListItem} text text_type_digits-default`}>034533</li>
              <li className={`${styles.ordersBoard__doneListItem} text text_type_digits-default`}>034532</li>
              <li className={`${styles.ordersBoard__doneListItem} text text_type_digits-default`}>034530</li>
              <li className={`${styles.ordersBoard__doneListItem} text text_type_digits-default`}>034527</li>
              <li className={`${styles.ordersBoard__doneListItem} text text_type_digits-default`}>034525</li>
            </ul>
          </div>

          <div className={styles.inWork}>
            <p className="text text_type_main-medium mb-6">В работе:</p>
            <ul className={styles.ordersBoard__list}>
              <li className="text text_type_digits-default">034538</li>
              <li className="text text_type_digits-default">034541</li>
              <li className="text text_type_digits-default">034542</li>
            </ul>
          </div>

        </div>

        <div className={styles.completed}>
          <p className="text text_type_main-medium">Выполнено за все время:</p>
          <p className="text text_type_digits-large">28 752</p>
        </div>

        <div className={styles.completed}>
          <p className="text text_type_main-medium">Выполнено за сегодня:</p>
          <p className="text text_type_digits-large">138</p>
        </div>

      </div>

    </main>
  );
};

export default Feed;