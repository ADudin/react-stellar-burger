import styles from "./app-header.module.css";

import { 
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>

        <nav className={styles.header__navigation}>

          <a href="/" className={`${styles.header__link} pl-5 pr-5`}>
            <BurgerIcon type="primary" />
            <p className="ml-2 text text_type_main-default">Конструктор</p>
          </a>

          <a href="/" className={`${styles.header__link} ${styles.header__link_disabled} ml-2 pl-5 pr-5`}>
            <ListIcon type="secondary" />
            <p className="ml-2 text text_type_main-default text_color_inactive">Лента заказов</p>
          </a>

        </nav>

        <Logo />

        <a href="/" className={`${styles.header__link} ${styles.header__link_disabled} pl-5 pr-5`}>
          <ProfileIcon type="secondary" />
          <p className="ml-2 text text_type_main-default text_color_inactive">Личный кабинет</p>
        </a>

      </div>
    </header>
  );
}

export default AppHeader;