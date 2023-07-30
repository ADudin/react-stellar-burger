import styles from "./order-history.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wsConnect, wsDisconnect } from "../../services/actions/order-feed";
import { WebsocketStatus, BASE_WS_ORDERS_URL, TOKENS } from "../../utils/data";

import OrderCard from "../order-card/order-card";
import Loader from "../loader/loader";
import Error from "../error/error";
import { getItems } from "../../services/actions/ingredients";
import { GET_ITEMS_FAILED_MESSAGE } from "../../services/actions/ingredients";

function OrderHistory() {
  const dispatch = useDispatch();
  const USER_WS_ORDERS_URL = `${BASE_WS_ORDERS_URL}?token=${
    localStorage.getItem(TOKENS.accessToken) ?
    localStorage.getItem(TOKENS.accessToken).slice(7) :
    ''
  }`;

  useEffect(() => {
    dispatch(getItems());
    dispatch(wsConnect(USER_WS_ORDERS_URL));
  
    return () => {
      dispatch(wsDisconnect);
    };
  }, [dispatch]);

  const ordersState = useSelector(state => state.orderFeed);
  const { itemsRequest, itemsFailed } = useSelector(state => state.ingredients);
  const { orders } = ordersState.orders;

  if (ordersState.status === WebsocketStatus.CONNECTING || itemsRequest) {
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