import styles from "./order.module.css";
import { FC } from "react";

import OrderInfo from "../../components/order-info/order-info";

const Order: FC = () => {
  return (
    <section className={styles.section}>
      <OrderInfo />
    </section>
  );
};

export default Order;