import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
  return (
    <div className={styles.app}>
        <AppHeader />
        <main className={styles.app__main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
    </div>
  );
}

export default App;