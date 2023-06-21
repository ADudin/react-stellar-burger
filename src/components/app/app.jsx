import styles from "./app.module.css";

import { 
  useState,
  useMemo
} from "react";

import AppHeader from "../app-header/app-header";
import BurgerIngridients from "../burger-ingridients/burger-ingridients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import { 
  BurgerIngridientsContext
} from "../../services/burger-constructor-context";

function App() {
  const [addedIngridients, setAddedIngridients] = useState([]);

  const burgerIngridientsContextValue = useMemo(() => {
    return {addedIngridients, setAddedIngridients};
  }, [addedIngridients, setAddedIngridients]);


  return (
    <div className={styles.app}>
      <BurgerIngridientsContext.Provider value={burgerIngridientsContextValue}>
        <AppHeader />
        <main className={styles.app__main}>
          <BurgerIngridients />
          <BurgerConstructor />
        </main>
      </BurgerIngridientsContext.Provider>
    </div>
  );
}

export default App;