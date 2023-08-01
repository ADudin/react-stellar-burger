import styles from './order-info.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { getOrderData } from '../../services/actions/order';
import { GET_ORDER_FAILED_MESSAGE } from '../../services/actions/order';

import Loader from '../loader/loader';
import Error from '../error/error';
import { GET_ITEMS_FAILED_MESSAGE } from '../../services/actions/ingredients';

function OrderInfo() {
  const dispatch = useDispatch();
  const ingredientsList = useSelector(state => state.ingredients.items);
  const { id } = useParams();
  const DONE_STATUS = 'done';

  useEffect(() => {
    dispatch(getOrderData(id));
  }, [dispatch, id]);

  const { orderData, orderRequest, orderFailed } = useSelector(state => state.order);
  const { itemsRequest, itemsFailed } = useSelector(state => state.ingredients);

  const { name, number, ingredients, status, createdAt } = orderData;

  const totalPrice = ingredientsList && ingredients && ingredients.reduce((acc, ingredientId) => {
    ingredientsList.forEach((item) => {
      if (item._id === ingredientId) {
        acc += item.price;
      }
    });

    return acc;
  }, 0);

  const ingredientsCount = {};
  const ingredientsData = [];

  if (ingredients && ingredientsList) {
    ingredients.forEach((item) => {
      if (ingredientsCount[item] === undefined) {
        ingredientsCount[item] = 1;
        ingredientsData.push(ingredientsList.find(element => element._id === item));
      } else {
        ingredientsCount[item] ++;
      }
    })
  };

  if (orderRequest || itemsRequest) {
    return (
      <div className='mt-15 mb-15'>
        <Loader size="large" inverse={true} />
      </div>
    );
  }

  if (orderFailed) {
    return (
      <Error errorMessage={GET_ORDER_FAILED_MESSAGE} />
    );
  }

  if (itemsFailed) {
    return (
      <Error errorMessage={GET_ITEMS_FAILED_MESSAGE} />
    );
  }
  
  return (
    <div className={styles.container}>

      <p className={`${styles.number} text text_type_digits-default`}>{`#${number}`}</p>
      <h1 className='text text_type_main-medium mt-10'>{name}</h1>
      <p className={`${styles.status} text text_type_main-default mt-3`}>
        {
          status === DONE_STATUS ?
          'Выполнен' :
          'В работе'
        }
      </p>
      <p className='text text_type_main-medium mt-15'>Состав:</p>

      <ul className={`${styles.list} mt-6 custom-scroll`}>
        {
          ingredients && ingredientsList && ingredientsData &&
          ingredientsData.map(
            (item) => 
            <li key={item._id} className={styles.listItem}>

              <div className={styles.listItem__imageWrapper}>
                <div className={styles.listItem__imageContainer}>
                  <img 
                    className={styles.listItem__image}
                    src={ 
                      item.image_mobile ?
                      item.image_mobile : ''
                    }
                    alt={
                      item.name ?
                      item.name : ''
                    }
                  />
                </div>
              </div>
    
              <p className={`${styles.listItem__name} text text_type_main-default`}>{item.name}</p>
    
              <div className={`${styles.listItem__priceContainer} mr-6`}>
                <span className='text text_type_digits-default'>{ingredientsCount[item._id]}</span> 
                <span className='text text_type_main-default'>&nbsp;x&nbsp;</span>
                <span className='text text_type_digits-default mr-2'>{item.price}</span>
                <CurrencyIcon type="primary" />
              </div>
    
            </li>
          )
        }
      </ul>

      <div className={`${styles.timestamp} mt-10`}>
        <p className='text text_type_main-default text_color_inactive'>
          <FormattedDate date={new Date(createdAt)} />
        </p>
        <div className={`${styles.totalPrice__container} ml-2`}>
        <span className='text text_type_digits-default mr-2'>{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>

    </div>
  );
};

export default OrderInfo;