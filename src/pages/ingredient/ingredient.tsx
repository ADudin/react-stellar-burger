import styles from "./ingredient.module.css";
import { FC } from "react";

import IngredientDetails from "../../components/ingredient-details/ingredient-details";

const Ingredient: FC = () => {
  return (
    <section className={styles.ingredient}>
      <IngredientDetails />
    </section>
  );
};

export default Ingredient;