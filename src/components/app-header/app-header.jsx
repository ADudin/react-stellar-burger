import styles from "./app-header.module.css";
import { NavLink, useLocation } from "react-router-dom";

import { 
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import { ROUTES } from "../../utils/data";

function AppHeader() {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>

        <nav className={styles.header__navigation}>

          <NavLink to={ROUTES.main} className={
            ({ isActive }) => isActive ?
            `${styles.header__link} pl-5 pr-5` :
            `${styles.header__link} pl-5 pr-5 text_color_inactive`
          }>
            {
              location.pathname === ROUTES.main ?
              <BurgerIcon type="primary" /> :
              <BurgerIcon type="secondary" />
            }
            <p className="ml-2 text text_type_main-default">Конструктор</p>
          </NavLink>

          <a href="/" className={`${styles.header__link} ${styles.header__link_disabled} ml-2 pl-5 pr-5`}>
            <ListIcon type="secondary" />
            <p className="ml-2 text text_type_main-default text_color_inactive">Лента заказов</p>
          </a>

        </nav>

        <Logo />

        <NavLink to={ROUTES.profile} className={
          ({ isActive }) => isActive ?
          `${styles.header__link} pl-5 pr-5` :
          `${styles.header__link} pl-5 pr-5 text_color_inactive`
        }>
          {
            location.pathname === ROUTES.profile ?
            <ProfileIcon type="primary" /> :
            <ProfileIcon type="secondary" />
          }
          <p className="ml-2 text text_type_main-default">Личный кабинет</p>
        </NavLink>

      </div>
    </header>
  );
}

export default AppHeader;