import styles from "./ingredient.module.css";

import IngredientDetails from "../../components/ingredient-details/ingredient-details";

function Ingredient() {
  return (
    <section className={styles.ingredient}>
      <IngredientDetails />
    </section>
  );
};

export default Ingredient;