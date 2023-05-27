import styles from "./ingridient-details.module.css";
import { ingredientPropType } from "../../utils/prop-types";

function IngridientDetails(props) {
  const { modalData } = props;

  return (
    <>
      <h2 className={`${styles.title} text text_type_main-large mt-10 ml-10`}>Детали ингридиента</h2>
      <div className={`${styles.container} pb-15`}>
        <img src={modalData.image_large} className={styles.image} alt={modalData.name}/>
        <p className={`${styles.description} text text_type_main-medium mt-4`}>{modalData.name}</p>
        <ul className={`${styles.list} mt-8`}>
          <li className={styles.listItem}>
            <p className="text text_type_main-small text_color_inactive">Калории, ккал</p>
            <p className="text text_type_digits-default text_color_inactive">{modalData.calories}</p>
          </li>
          <li className={styles.listItem}>
            <p className="text text_type_main-small text_color_inactive">Белки, г</p>
            <p className="text text_type_digits-default text_color_inactive">{modalData.proteins}</p>
          </li>
          <li className={styles.listItem}>
            <p className="text text_type_main-small text_color_inactive">Жиры, г</p>
            <p className="text text_type_digits-default text_color_inactive">{modalData.fat}</p>
          </li>
          <li className={styles.listItem}>
            <p className="text text_type_main-small text_color_inactive">Углеводы, г</p>
            <p className="text text_type_digits-default text_color_inactive">{modalData.carbohydrates}</p>
          </li>
        </ul>
      </div>
    </>
  )
}

IngridientDetails.propTypes = {
  modalData: ingredientPropType
}

export default IngridientDetails;