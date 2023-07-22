import styles from "./feed.module.css";

import OrderCard from "../../components/order-card/order-card";

function Feed() {
  return (
    <main className={`${styles.main} pb-15`}>

      <h1 className={`${styles.main__title} text text_type_main-large mt-10`}>Лента заказов</h1>

      <ul className={`${styles.list} custom-scroll`}>
        <OrderCard />
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