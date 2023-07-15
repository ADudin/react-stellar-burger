import styles from "./reset-password.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Input,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";

import Loader from "../../components/loader/loader";
import { resetUserPassword } from "../../services/actions/user";
import { ROUTES } from "../../utils/data";

function ResetPassword() {
  const [form, setValue] = useState({
    password: '',
    token: ''
  });

  const { userRequest, changePasswordRequestSent, authorized } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authorized || !changePasswordRequestSent) {
      navigate(ROUTES.main);
    }
  }, [authorized, navigate, changePasswordRequestSent]);

  const onChange = evt => {
    setValue({
      ...form,
      [evt.target.name]: evt.target.value
    });
  };

  const resetPassword = useCallback(
    evt => {
      evt.preventDefault();
      if (form.password !== '' || form.token !== '') {
        dispatch(resetUserPassword(form));
        navigate(ROUTES.login);
      }
    }, [dispatch, form, navigate]
  );

  if (userRequest) {
    return (
      <Loader size="large" inverse={true} /> 
    );
  }

  return (
    <section className={styles.container}>

      <h1 className="text text_type_main-large">Восстановление пароля</h1>

      <form className={`${styles.form} pb-20`}>
        <label>
          <PasswordInput
            type='password'
            placeholder='Введите новый пароль'
            onChange={onChange}
            icon='ShowIcon'
            value={form.password}
            name='password'
            size='default'
            extraClass='mt-6'
          />
        </label>
        <label>
          <Input
            type='text'
            placeholder='Введите код из письма'
            onChange={onChange}
            value={form.token}
            name='token'
            error={false}
            errorText='Ошибка'
            size='default'
            extraClass='mt-6'
          />
        </label>

        <Button
          htmlType='submit'
          type='primary'
          extraClass='mt-6'
          size='medium'
          onClick={resetPassword}
        >
          Сохранить
        </Button>
      </form>

      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль? <Link to={ROUTES.login} className={styles.link}>Войти</Link>
      </p>

    </section>
  );
};

export default ResetPassword;