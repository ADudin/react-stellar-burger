import styles from "./feed.module.css";
import { useEffect, FC } from "react";
import { useDispatch, useSelector } from "../../services/types/hooks";

import { WebsocketStatus, BASE_WS_ORDERS_URL, ALL_WS_ORDERS_ENDPOINT } from "../../utils/data";
import { wsConnect, wsDisconnect } from "../../services/actions/order-feed";

import OrderCard from "../../components/order-card/order-card";
import Loader from "../../components/loader/loader";

const Feed: FC = () => {
  const dispatch = useDispatch();
  const MAX_RENDERED_ORDER_NUMBERS = 20;

  useEffect(() => {
    dispatch(wsConnect(
      `${BASE_WS_ORDERS_URL}${ALL_WS_ORDERS_ENDPOINT}`
    ));
    return () => {
      dispatch(wsDisconnect());
    }
  }, [dispatch]);

  const orderState = useSelector(state => state.orderFeed);
  const { orders, total, totalToday } = orderState.orders;

  const doneOrdersNumbers: number[] = [];
  const inWorkOrdersNumbers: number[] = [];
  
  orders && orders.forEach((item) => {
    if (item.status === 'done') {
      doneOrdersNumbers.push(item.number);
    } else {
      inWorkOrdersNumbers.push(item.number);
    }
  });

  if (orderState.status === WebsocketStatus.CONNECTING) {
    return (
      <Loader size="large" inverse={true} />
    );
  }

  return (
    <main className={`${styles.main} pb-15`}>

      <h1 className={`${styles.main__title} text text_type_main-large mt-10`}>Лента заказов</h1>

      <ul className={`${styles.list} custom-scroll`}>
        {
          orders && orders.map(
            (item) => <OrderCard key={item._id} orderData={item} />
          )
        }
      </ul>

      <div className={styles.stats}>

        <div className={styles.ordersBoard}>

          <div className={styles.done}>
            <p className="text text_type_main-medium mb-6">Готовы:</p>
            <ul className={styles.ordersBoard__list}>
              { 
                doneOrdersNumbers && 
                doneOrdersNumbers
                .slice(0, MAX_RENDERED_ORDER_NUMBERS)
                .map(
                  (item, i) => <li key={i} className={`${styles.ordersBoard__doneListItem} text text_type_digits-default`}>{item}</li>
                )
              }
            </ul>
          </div>

          <div className={styles.inWork}>
            <p className="text text_type_main-medium mb-6">В работе:</p>
            <ul className={styles.ordersBoard__list}>
              {
                inWorkOrdersNumbers && 
                inWorkOrdersNumbers
                .slice(0, MAX_RENDERED_ORDER_NUMBERS)
                .map(
                  (item, i) => <li key={i} className="text text_type_digits-default">{item}</li>
                )
              }
            </ul>
          </div>

        </div>

        <div className={styles.completed}>
          <p className="text text_type_main-medium">Выполнено за все время:</p>
          <p className="text text_type_digits-large">{total}</p>
        </div>

        <div className={styles.completed}>
          <p className="text text_type_main-medium">Выполнено за сегодня:</p>
          <p className="text text_type_digits-large">{totalToday}</p>
        </div>

      </div>

    </main>
  );
};

export default Feed;