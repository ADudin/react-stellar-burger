import styles from "./order-details.module.css";
import orderConfirm from "../../images/orderConfirm.svg";

function OrderDetails(props) {

  const orderNumber = props.orderNumber;

  return (
    <div className={`${styles.order__container} pt-30 pb-30`}>
      <p className="text text_type_digits-large">{orderNumber}</p>
      <h2 className="text text_type_main-medium mt-8">идентификатор заказа</h2>
      <img className={`${styles.order__image} mt-15`} src={orderConfirm} alt="заказ принят" />
      <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mt-2">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}

export default OrderDetails;