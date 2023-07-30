import styles from "./profile.module.css";
import { useDispatch } from "react-redux";
import { NavLink, Outlet, useLocation} from "react-router-dom";

import { ROUTES, TOKENS } from "../../utils/data";
import { logoutUser } from "../../services/actions/user";

function Profile() {
  const dispatch = useDispatch();
  const location = useLocation();

  const onLogout = () => {
    const refreshToken = localStorage.getItem(TOKENS.refreshToken);
    dispatch(logoutUser(refreshToken));
  };

  return (
    <section className={
      location.pathname === ROUTES.orderHistory ?
      `${styles.container} pt-10` :
      `${styles.container} pt-30`
      }
    >

      <div className={styles.navigation}>
        <nav>
          <ul className={styles.links}>

            <li>
              <NavLink to={ROUTES.profile} className={
                (data) => data.isActive ?
                `${styles.link} ${styles.link_active}` :
                `${styles.link} text_color_inactive`
                }
                end
              >
                <p className="text text_type_main-medium">Профиль</p>
              </NavLink>
            </li>

            <li>
              <NavLink to={`${ROUTES.profile}${ROUTES.orders}`} className={
                (data) => data.isActive ?
                `${styles.link} ${styles.link_active}` :
                `${styles.link} text_color_inactive`
              }
              >
                <p className="text text_type_main-medium">История заказаов</p>
              </NavLink>
            </li>

            <li>
              <NavLink
               to={ROUTES.main} 
               onClick={onLogout}
               className={`${styles.link} text_color_inactive`}
              >
                <p className="text text_type_main-medium">Выход</p>
              </NavLink>
            </li>

          </ul>
        </nav>

        <p className={`${styles.paragraph} text text_type_main-default text_color_inactive mt-20`}>
          {
            location.pathname === ROUTES.profile ?
            <span>В этом разделе вы можете<br /> изменить свои персональные данные</span> :
            location.pathname === ROUTES.orderHistory ?
            <span>В этом разделе вы можете<br /> просмотреть свою историю заказов</span> :
            ''
          }
          
        </p>

      </div>

      <Outlet />

    </section>
  );
};

export default Profile;