import styles from "./app.module.css";

import { 
  useState,
  useEffect,
  useReducer
} from "react";

import AppHeader from "../app-header/app-header";
import BurgerIngridients from "../burger-ingridients/burger-ingridients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import { 
  BurgerIngridientsContext,
  BunIngridientContext,
  PriceContext
} from "../../services/burger-constructor-context";

const baseUrl = 'https://norma.nomoreparties.space/api/ingredients';

const totalPriceInitialState = {count: 0};

function reducer(state = totalPriceInitialState, action) {
  switch (action.type) {
    case 'add':
      return {count: state.count + action.payload};
    case 'remove':
      return {count: state.count - action.payload};
    case 'reset':
      return totalPriceInitialState;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function App() {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: []
  });

  const [addedIngridients, setAddedIngridients] = useState([]);
  const [addedBun, setAddedBun] = useState(null);
  const [totalPriceState, totalPriceDispatch] = useReducer(reducer, totalPriceInitialState);

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
          setState({ ...state, hasError: true, isLoading: false });
        })
    };
    
    getData();
  },  []);

  const { data, isLoading, hasError } = state;
  
  return (
    <div className={styles.app}>
      <BunIngridientContext.Provider value={{addedBun, setAddedBun}}>
        <BurgerIngridientsContext.Provider value={{addedIngridients, setAddedIngridients}}>
          <PriceContext.Provider value={{totalPriceState, totalPriceDispatch}}>
            <AppHeader />
            <main className={styles.app__main}>
              {
              !isLoading && !hasError && data.length &&
              <>
                <BurgerIngridients data={data} />
                <BurgerConstructor />
              </>
              }
            </main>
          </PriceContext.Provider>
        </BurgerIngridientsContext.Provider>
      </BunIngridientContext.Provider>
    </div>
  );
}

export default App;