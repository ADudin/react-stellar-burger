import styles from "./app.module.css";

import { 
  useState,
  useEffect
} from "react";

import AppHeader from "../app-header/app-header";
import BurgerIngridients from "../burger-ingridients/burger-ingridients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

const baseUrl = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    
    fetch(baseUrl)
      .then(res => {
        if(res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then(res => setData(res.data))
      .catch(error => console.log(error))
  }, [])

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