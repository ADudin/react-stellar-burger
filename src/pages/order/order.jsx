import styles from "./order.module.css";

import OrderInfo from "../../components/order-info/order-info";

function Order() {
  return (
    <section className={styles.section}>
      <OrderInfo />
    </section>
  );
};

export default Order;