import styles from "./ingredient.module.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getItems } from "../../services/actions/ingredients";

function Ingredient() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const ingredients = useSelector(state => state.ingredients.items);
  const { ingredientId } = useParams();
  const currentItem = ingredients.find(item => item._id === ingredientId);

  if (currentItem) {
    return (
      <section className={`${styles.ingredient} pt-20`}>  
        <h2 className={`${styles.title} text text_type_main-large mt-10`}>Детали ингридиента</h2>
        <div className={`${styles.container} pb-15`}>
          <img src={currentItem.image_large} className={styles.image} alt={currentItem.name}/>
          <p className={`${styles.description} text text_type_main-medium mt-4`}>{currentItem.name}</p>
          <ul className={`${styles.list} mt-8`}>
            <li className={styles.listItem}>
              <p className="text text_type_main-small text_color_inactive">Калории, ккал</p>
              <p className="text text_type_digits-default text_color_inactive">{currentItem.calories}</p>
            </li>
            <li className={styles.listItem}>
              <p className="text text_type_main-small text_color_inactive">Белки, г</p>
              <p className="text text_type_digits-default text_color_inactive">{currentItem.proteins}</p>
            </li>
            <li className={styles.listItem}>
              <p className="text text_type_main-small text_color_inactive">Жиры, г</p>
              <p className="text text_type_digits-default text_color_inactive">{currentItem.fat}</p>
            </li>
            <li className={styles.listItem}>
              <p className="text text_type_main-small text_color_inactive">Углеводы, г</p>
              <p className="text text_type_digits-default text_color_inactive">{currentItem.carbohydrates}</p>
            </li>
          </ul>
        </div>
      </section>
    );
  }

  return null;
};

export default Ingredient;