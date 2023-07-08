import styles from "./burger-ingredients.module.css";

import { 
  useState, 
  useEffect,
  useMemo
} from "react";

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import Loader from "../loader/loader";
import Error from "../error/error";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../../services/actions/ingredients";
import { useInView } from "react-intersection-observer";
import { GET_ITEMS_FAILED_MESSAGE } from "../../services/actions/ingredients";

function BurgerIngredients() {
  const { items, itemsRequest, itemsFailed } = useSelector(state => state.ingredients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const Tabs = useMemo(() => {
    return {
      BUNS: 'buns',
      SAUCES: 'sauces',
      MAINS: 'mains'
    };
  }, []);
  
  const [current, setCurrent] = useState(Tabs.BUNS);

  const { ref: refBuns, inView: inViewBuns } = useInView({ threshold: 0 });
  const { ref: refSauces, inView: inViewSauces } = useInView({ threshold: 0 });
  const { ref: refMains, inView: inViewMains } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inViewBuns) {
      setCurrent(Tabs.BUNS);
    }
    if (inViewSauces) {
      setCurrent(Tabs.SAUCES)
    }
    if (inViewMains) {
      setCurrent(Tabs.MAINS)
    }
  }, [inViewBuns, inViewSauces, inViewMains]);

  const handleTabClick = (e) => {
    setCurrent(e);
  };
  
  const buns = items.filter(item => item.type === 'bun');
  const sauces = items.filter(item => item.type === 'sauce');
  const mains = items.filter(item => item.type === 'main');

  return (
    <section className={styles.ingredients}>

      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>

      <div className={`${styles.ingredients__tabs} mt-5`}>
        <Tab value={Tabs.BUNS} active={current === Tabs.BUNS} onClick={handleTabClick}>
          Булки
        </Tab>
        <Tab value={Tabs.SAUCES} active={current === Tabs.SAUCES} onClick={handleTabClick}>
          Соусы
        </Tab>
        <Tab value={Tabs.MAINS} active={current === Tabs.MAINS} onClick={handleTabClick}>
          Начинки
        </Tab>
      </div>

      {
        itemsRequest ? 
        <Loader size="large" inverse={true} /> :
        itemsFailed ?
        <Error errorMessage={GET_ITEMS_FAILED_MESSAGE} /> :
        <ul className={`${styles.ingredients__types} mt-10 custom-scroll`}>

          <li ref={refBuns}>
            <p className="text text_type_main-medium">Булки</p>
            <ul className={`${styles.ingredients__items} pt-6 pr-4 pl-4`}>
              {buns.map(item => <BurgerIngredient key={item._id} item={item} />)}
            </ul>
          </li>

          <li ref={refSauces} className="mt-10">
            <p className="text text_type_main-medium">Соусы</p>
            <ul className={`${styles.ingredients__items} pt-6 pr-4 pl-4`}>
              {sauces.map(item => <BurgerIngredient key={item._id} item={item} />)}
            </ul>
          </li>

          <li ref={refMains} className="mt-10">
            <p className="text text_type_main-medium">Начинки</p>
            <ul className={`${styles.ingredients__items} pt-6 pr-4 pl-4`}>
              {mains.map(item => <BurgerIngredient key={item._id} item={item} />)}
            </ul>
          </li>

        </ul>
      }

    </section>
  );
}

export default BurgerIngredients;