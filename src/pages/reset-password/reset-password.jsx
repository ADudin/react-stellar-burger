import styles from "./reset-password.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Input,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";

import Loader from "../../components/loader/loader";
import { resetUserPassword } from "../../services/actions/user";
import { ROUTES } from "../../utils/data";
import { useForm } from "../../hooks/useForm";

function ResetPassword() {
  const { values, handleChange } = useForm({
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

  const onSubmit = useCallback(
    evt => {
      evt.preventDefault();
      if (values.password !== '' || values.token !== '') {
        dispatch(resetUserPassword(values));
        navigate(ROUTES.login);
      }
    }, [dispatch, values, navigate]
  );

  if (userRequest) {
    return (
      <Loader size="large" inverse={true} /> 
    );
  }

  return (
    <section className={styles.container}>

      <h1 className="text text_type_main-large">Восстановление пароля</h1>

      <form onSubmit={onSubmit} className={`${styles.form} pb-20`}>
        
        <PasswordInput
          type='password'
          placeholder='Введите новый пароль'
          onChange={handleChange}
          icon='ShowIcon'
          value={values.password}
          name='password'
          size='default'
          extraClass='mt-6'
        />
        
        <Input
          type='text'
          placeholder='Введите код из письма'
          onChange={handleChange}
          value={values.token}
          name='token'
          error={false}
          errorText='Ошибка'
          size='default'
          extraClass='mt-6'
        />

        <Button
          htmlType='submit'
          type='primary'
          extraClass='mt-6'
          size='medium'
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