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
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: []
  });

  useEffect(() => {

    const getData = () => {
      setState({ ...state, hasError: false, isLoading: true });
      fetch(baseUrl)
        .then(res => {
          if(res.ok) {
            return res.json()
          }
          return Promise.reject(`Ошибка ${res.status}`);
        })
        .then(res => setState({ ...state, data: res.data, isLoading: false }))
        .catch(error => {
          console.log(error);
          setState({ ...state, hasError: true, isLoading: false })
        })
    };
    
    getData();
  },  []);

  const { data, isLoading, hasError } = state;

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.app__main}>
        {
        !isLoading && !hasError && data.length &&
        <>
          <BurgerIngridients data={data} />
          <BurgerConstructor data={data} />
        </>
        }
      </main>
    </div>
  );
}

export default App;