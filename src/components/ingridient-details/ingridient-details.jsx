import styles from "./ingridient-details.module.css";
import { useSelector } from "react-redux";

function IngridientDetails() {
  const currentItem = useSelector(state => state.currentIngridient.currentItem);

  return (
    <>
      <h2 className={`${styles.title} text text_type_main-large mt-10 ml-10`}>Детали ингридиента</h2>
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
    </>
  )
}

export default IngridientDetails;