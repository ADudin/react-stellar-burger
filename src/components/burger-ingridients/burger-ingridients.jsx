import styles from "./burger-ingridients.module.css";

import { 
  useState, 
  useContext 
} from "react";

import propTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { ingredientPropType } from "../../utils/prop-types";

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from "../modal/modal";
import IngridientDetails from "../ingridient-details/ingridient-details";
import BurgerIngridient from "../burger-ingridient/burger-ingridient";

import { 
  BurgerIngridientsContext,
  BunIngridientContext
} from "../../services/burger-constructor-context"; 


function BurgerIngridients(props) {
  const [current, setCurrent] = useState('one');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const { addedIngridients, setAddedIngridients } = useContext(BurgerIngridientsContext);
  const { setAddedBun } = useContext(BunIngridientContext);
  
  const ingridients = props.data; 
  
  const buns = ingridients.filter(item => item.type === 'bun');
  const sauces = ingridients.filter(item => item.type === 'sauce');
  const mains = ingridients.filter(item => item.type === 'main');

  const openModal = (element) => {
    //setModalVisible(true);
    //setModalData(element);
    if (element.type === 'bun') {
      setAddedBun(element);
    } else {
      console.log(element);
      const newElement = {...element, _id: uuidv4()};
      setAddedIngridients([...addedIngridients, newElement]);
    }
  };

  const closeModal =() => {
    setModalVisible(false);
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

      <Modal modalActive={modalVisible} closeModal={closeModal}>
        <IngridientDetails modalData={modalData} />
      </Modal>

    </section>
  );
}

BurgerIngridients.propTypes = {
  data: propTypes.arrayOf(ingredientPropType)
}

export default BurgerIngridients;