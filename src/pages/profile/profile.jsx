import styles from "./profile.module.css";
import { useDispatch } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";

import { ROUTES, TOKENS } from "../../utils/data";
import { logoutUser } from "../../services/actions/user";

function Profile() {
  const dispatch = useDispatch();

  const onLogout = () => {
    const refreshToken = localStorage.getItem(TOKENS.refreshToken);
    dispatch(logoutUser(refreshToken));
  };

  return (
    <section className={styles.container}>

      <div className={styles.navigation}>
        <nav>
          <ul className={styles.links}>

            <li>
              <NavLink to={ROUTES.profile} className={
                (data) => data.isActive ? 
                `${styles.link} ${styles.link_active}` :
                `${styles.link}`
                }
              >
                <p className="text text_type_main-medium">Профиль</p>
              </NavLink>
            </li>

            <li>
              <NavLink to={`${ROUTES.profile}${ROUTES.orders}`} className={`${styles.link} text_color_inactive`}>
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
          В этом разделе вы можете<br/> изменить свои персональные данные
        </p>

      </div>

      <Outlet />

    </section>
  );
};

export default Profile;