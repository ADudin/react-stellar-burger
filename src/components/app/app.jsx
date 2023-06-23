import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngridients from "../burger-ingridients/burger-ingridients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
  return (
    <div className={styles.app}>
        <AppHeader />
        <main className={styles.app__main}>
          <BurgerIngridients />
          <BurgerConstructor />
        </main>
    </div>
  );
}

export default App;