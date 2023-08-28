import styles from "./order-history.module.css";
import { useEffect, FC } from "react";
import { useDispatch, useSelector } from "../../services/types/hooks";
import { wsConnect, wsDisconnect } from "../../services/actions/order-feed";
import { WebsocketStatus, BASE_WS_ORDERS_URL, TOKENS } from "../../utils/data";

import OrderCard from "../order-card/order-card";
import Loader from "../loader/loader";
import Error from "../error/error";
import { GET_ITEMS_FAILED_MESSAGE } from "../../services/actions/ingredients";

const OrderHistory: FC = () => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem(TOKENS.accessToken);
  
  const USER_WS_ORDERS_URL = `${BASE_WS_ORDERS_URL}?token=${
    accessToken ?
    accessToken.slice(7) :
    ''
  }`;

  useEffect(() => {
    dispatch(wsConnect(USER_WS_ORDERS_URL));
  
    return () => {
      dispatch(wsDisconnect);
    };
  }, [dispatch, USER_WS_ORDERS_URL]);

  const ordersState = useSelector(state => state.orderFeed);
  const { itemsFailed } = useSelector(state => state.ingredients);
  const { orders } = ordersState.orders;

  if (ordersState.status === WebsocketStatus.CONNECTING) {
    return (
      <Loader size="large" inverse={true} />
    );
  }

  if (itemsFailed) {
    return (
      <Error errorMessage={GET_ITEMS_FAILED_MESSAGE} />
    );
  }

  return (
    <ul className={`${styles.list} custom-scroll`}>
      {
        orders && orders.map(
          (item) => <OrderCard key={item._id} orderData={item} />
        ).reverse()
      }
    </ul>
  );
};

export default OrderHistory;