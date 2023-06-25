import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

function App() {
  return (
    <div className={styles.app}>
        <AppHeader />
        <DndProvider backend={HTML5Backend}>
          <main className={styles.app__main}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        </DndProvider>
    </div>
  );
}

export default App;