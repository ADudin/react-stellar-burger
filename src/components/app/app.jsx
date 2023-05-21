import styles from "./app.module.css";
import { data } from "../../utils/data";

import AppHeader from "../app-header/app-header";
import BurgerIngridients from "../burger-ingridients/burger-ingridients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.app__main}>
        <BurgerIngridients data={ data } />
        <BurgerConstructor data={ data } />
      </main>
    </div>
  );
}

export default App;
