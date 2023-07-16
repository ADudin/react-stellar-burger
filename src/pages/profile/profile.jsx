import styles from "./profile.module.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { 
  Input,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";

import { ROUTES } from "../../utils/data";
import { logoutUser, updateUserData } from "../../services/actions/user";

function Profile() {
  const { name, email } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [form, setValue] = useState({
    name: name,
    email: email,
    password: ''
  });

  const onChange = evt => {
    setValue({
      ...form,
      [evt.target.name]: evt.target.value
    });
  };

  const onReset = () => {
    setValue({
      name: name,
      email: email,
      password: ''
    });
  };

  const onSubmit = () => {
    dispatch(updateUserData(form));
  }

  const onLogout = () => {
    const refreshToken = localStorage.getItem('refreshToken');
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

      <form onSubmit={onSubmit}>

        <Input
          type='text'
          placeholder='Имя'
          onChange={onChange}
          value={form.name}
          name='name'
          error={false}
          errorText='Ошибка'
          size='default'
          icon='EditIcon'
        />

        <Input
          type='email'
          placeholder='Логин'
          onChange={onChange}
          value={form.email}
          name='email'
          error={false}
          errorText='Ошибка'
          size='default'
          extraClass='mt-6'
          icon='EditIcon'
        />

        <Input
          type='password'
          placeholder='Пароль'
          onChange={onChange}
          icon='EditIcon'
          value={form.password}
          name='password'
          size='default'
          extraClass='mt-6'
        />

        <div className={
          form.name === name && form.email === email && form.password === '' ?
          `${styles.buttons__container}` :
          `${styles.buttons__container_active} mt-6`
        }>

          <button
            className={`${styles.button} text text_type_main-default pt-4 pb-4 pl-2 pr-2 mr-6`}
            type='reset'
            size='medium'
            onClick={onReset}
          >
            Отмена
          </button>

          <Button
            htmlType='submit'
            type='primary'
            size='medium'
          >
            Сохранить
          </Button>

        </div>

      </form>

    </section>
  );
};

export default Profile;