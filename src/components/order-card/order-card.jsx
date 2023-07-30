import styles from "./order-card.module.css";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

import { orderPropType } from "../../utils/prop-types";
import { ROUTES } from "../../utils/data";

const MAX_RENDERED_INGREDIENT_IMAGES = 5;

function OrderCard(props) {
  const { number, createdAt, name, ingredients, _id, status } = props.orderData;
  const location = useLocation();

  const ingredientsList = useSelector(state => state.ingredients).items;
  
  const price = ingredientsList && ingredients && ingredients.reduce((acc, ingredientId) => {
    ingredientsList.forEach((item) => {
      if (item._id === ingredientId) {
        acc += item.price;
      }
    });

    return acc;
  }, 0);

  const images = [];

  ingredientsList && ingredients && ingredientsList.forEach((ingredient) => {
    ingredients.forEach((item) => {
      if (item === ingredient._id) {
        images.push({
          image: ingredient.image_mobile,
          name: ingredient.name
        });
      }
    });
  });

  return (
    <li>
      <Link 
        key={_id} 
        to={`/feed/${number}`}
        state={{ background: location }}
        className={`${styles.card} pt-6 pr-6 pb-6 pl-6 mr-2`}
      >
      <div className={styles.card__header}>
        <span className="text text_type_main-defaulttext text_type_digits-default">
          {`#${number}`}
        </span>
        <span className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(createdAt)} />
        </span>
      </div>
      <div className={styles.card__nameContainer}>
        <p className="text text_type_main-medium">{name}</p>
        {
          location.pathname === ROUTES.orderHistory ?
          <span className={
            status === 'done' ?
            `text text_type_main-default` :
            status === 'pending' || status === 'created' ?
            `${styles.card__status_inWork} text text_type_main-default` :
            `${styles.card__status_cancelled} text text_type_main-default`
          }>
            {
              status === 'done' ?
              'Выполнен' :
              status === 'pending' || status === 'created' ?
              'Готовится' :
              'Отменен'
            }
          </span> :
          null
        }
      </div>

      <div className={styles.card__components}>

        <div className={styles.card__ingredientsContainer}>

          {
            images.slice(0, MAX_RENDERED_INGREDIENT_IMAGES)
            .map((item, i) => 
              <div key={i} className={styles.card__imageWrapper}>
                <div className={styles.card__imageContainer}>
                  <img 
                    className={styles.card__ingredientImage}
                    src={item.image}
                    alt={item.name}
                  />
                </div>
              </div>
            )
          }
          {
            images.length > MAX_RENDERED_INGREDIENT_IMAGES ?
            <div className={styles.card__imageWrapper}>
              <div className={styles.card__imageContainer}>
                <img 
                  className={styles.card__ingredientImage}
                  src={images[MAX_RENDERED_INGREDIENT_IMAGES].image}
                  alt={images[MAX_RENDERED_INGREDIENT_IMAGES].name}
                />
              </div>
            </div> :
            null
          }

          <span className={`${styles.ingredients__count} text text_type_main-default`}>
          {
            images.length > MAX_RENDERED_INGREDIENT_IMAGES ?
            images.length - MAX_RENDERED_INGREDIENT_IMAGES :
            ''
          }
          </span>

        </div>

        <div className={styles.card__priceContainer}>
          <span className="text text_type_main-defaulttext text_type_digits-default mr-2">{price}</span>
          <CurrencyIcon />
        </div>

      </div>
      </Link>
    </li>
  );
};

OrderCard.propTypes = {
  orderData: orderPropType.isRequired
}

export default OrderCard;