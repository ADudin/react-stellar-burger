import styles from './order-info.module.css';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function OrderInfo() {
  return (
    <div className={styles.container}>

      <p className={`${styles.number} text text_type_digits-default`}>#034533</p>
      <h1 className='text text_type_main-medium mt-10'>Black Hole Singularity острый бургер</h1>
      <p className={`${styles.status} text text_type_main-default mt-3`}>Выполнен</p>
      <p className='text text_type_main-medium mt-15'>Состав:</p>

      <ul className={`${styles.list} mt-6 custom-scroll`}>

        <li className={styles.listItem}>

          <div className={styles.listItem__imageWrapper}>
            <div className={styles.listItem__imageContainer}>
              <img 
                className={styles.listItem__image}
                src={''}
                alt={''}
              />
            </div>
          </div>

          <p className={`${styles.listItem__name} text text_type_main-default`}>Флюоресцентная булка R2-D3</p>

          <div className={`${styles.listItem__priceContainer} mr-6`}>
            <span className='text text_type_digits-default'>2</span> 
            <span className='text text_type_main-default'>&nbsp;x&nbsp;</span>
            <span className='text text_type_digits-default mr-2'>20</span>
            <CurrencyIcon type="primary" />
          </div>

        </li>

      </ul>

      <div className={`${styles.timestamp} mt-10`}>
        <p className='text text_type_main-default text_color_inactive'>Вчера, 13:50 i-GMT+3</p>
        <div className={`${styles.totalPrice__container} ml-2`}>
          <span className='text text_type_digits-default mr-2'>510</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>

    </div>
  );
};

export default OrderInfo;