import styles from "./order-card.module.css";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

import bun from "../../images/test/bun-01.png";
import meat from "../../images/test/meat-03.png";
import core from "../../images/test/core.png";
import mineralRings from "../../images/test/mineral rings.png";
import sauce from "../../images/test/sauce-03.png";
import cheese from "../../images/test/cheese.png";

function OrderCard(props) {
  const orderData = props.orderData;

  const { number, createdAt } = orderData;

  return (
    <li className={`${styles.card} pt-6 pr-6 pb-6 pl-6 mr-2`}>

      <div className={styles.card__header}>
        <span className="text text_type_main-defaulttext text_type_digits-default">
          {`#${number}`}
        </span>
        <span className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(createdAt)} />
        </span>
      </div>

      <p className="text text_type_main-medium">Death Star Starship Main бургер</p>

      <div className={styles.card__components}>

        <div className={styles.card__ingredientsContainer}>

            <div className={styles.card__imageWrapper}>
              <img 
                className={styles.card__ingredient}
                src={bun}
                alt="bun"
              />
            </div>

            <div className={styles.card__imageWrapper}>
              <img 
                className={styles.card__ingredient}
                src={meat}
                alt="meat"
              />
            </div>

            <div className={styles.card__imageWrapper}>
              <img 
                className={styles.card__ingredient}
                src={core}
                alt="core"
              />
            </div>

            <div className={styles.card__imageWrapper}>
              <img 
                className={styles.card__ingredient}
                src={mineralRings}
                alt="mineral rings"
              />
            </div>

            <div className={styles.card__imageWrapper}>
              <img 
                className={styles.card__ingredient}
                src={sauce}
                alt="sauce"
              />
            </div>

            <div className={styles.card__imageWrapper}>
              <img 
                className={styles.card__ingredient}
                src={cheese}
                alt="cheese"
              />
            </div>

          <span className={`${styles.ingredients__count} text text_type_main-default`}>+3</span>

        </div>

        <div className={styles.card__priceContainer}>
          <span className="text text_type_main-defaulttext text_type_digits-default mr-2">480</span>
          <CurrencyIcon />
        </div>

      </div>

    </li>
  );
};

export default OrderCard;