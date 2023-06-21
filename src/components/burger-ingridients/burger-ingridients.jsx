import styles from "./burger-ingridients.module.css";

import { 
  useState, 
  useEffect
} from "react";

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from "../modal/modal";
import IngridientDetails from "../ingridient-details/ingridient-details";
import BurgerIngridient from "../burger-ingridient/burger-ingridient";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../../services/actions/ingridients";
import { showItem, hideItem } from "../../services/actions/ingridient";
import { Loader } from "../loader/loader";

function BurgerIngridients() {
  const { items, itemsRequest } = useSelector(state => state.ingridients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);
  
  const [current, setCurrent] = useState('one');
  const [modalVisible, setModalVisible] = useState(false);
  
  const buns = items.filter(item => item.type === 'bun');
  const sauces = items.filter(item => item.type === 'sauce');
  const mains = items.filter(item => item.type === 'main');

  const openModal = (element) => {
    dispatch(showItem(element));
    setModalVisible(true);
  };

  const closeModal =() => {
    setModalVisible(false);
    // setTimeout for smooth popup closing,
    // otherwise content will disappear before popup will close
    setTimeout(() => {
      dispatch(hideItem());
    }, 450);
  }

  return (
    <section className={styles.ingridients}>

      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>

      <div className={`${styles.ingridients__tabs} mt-5`}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      {
        itemsRequest ? <Loader size="large" inverse={true} /> :
        <ul className={`${styles.ingridients__types} mt-10 custom-scroll`}>

          <li>
            <p className="text text_type_main-medium">Булки</p>
            <ul className={`${styles.ingridients__items} pt-6 pr-4 pl-4`}>
              {buns.map(item => <BurgerIngridient key={item._id} item={item} openModal={() => openModal(item)} />)}
            </ul>
          </li>

          <li className="mt-10">
            <p className="text text_type_main-medium">Соусы</p>
            <ul className={`${styles.ingridients__items} pt-6 pr-4 pl-4`}>
              {sauces.map(item => <BurgerIngridient key={item._id} item={item} openModal={() => openModal(item)} />)}
            </ul>
          </li>

          <li className="mt-10">
            <p className="text text_type_main-medium">Начинки</p>
            <ul className={`${styles.ingridients__items} pt-6 pr-4 pl-4`}>
              {mains.map(item => <BurgerIngridient key={item._id} item={item} openModal={() => openModal(item)} />)}
            </ul>
          </li>

        </ul>
      }

      <Modal modalActive={modalVisible} closeModal={closeModal}>
        <IngridientDetails />
      </Modal>

    </section>
  );
}

export default BurgerIngridients;