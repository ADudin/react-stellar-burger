import styles from "./register.module.css";
import { Link } from "react-router-dom";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Input, 
  EmailInput,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";

import Loader from "../../components/loader/loader";
import { registerUser } from "../../services/actions/user";
import { ROUTES } from "../../utils/data";
import { useForm } from "../../hooks/useForm";


function Register() {
  const { values, handleChange } = useForm({
    name: '',
    email: '',
    password: ''
  });

  const { userRequest } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    evt => {
      evt.preventDefault();
      if (values.email !== '' && values.password !== '' && values.name !== '') {
        dispatch(registerUser(values));
      }
    }, [dispatch, values]
  );

  if (userRequest) {
    return (
      <Loader size="large" inverse={true} /> 
    );
  }

  return (
    <section className={styles.container}>

      <h1 className="text text_type_main-large">Регистрация</h1>

      <form onSubmit={onSubmit} className={`${styles.form} pb-20`}>
        
        <Input
          type='text'
          placeholder='Имя'
          onChange={handleChange}
          value={values.name}
          name='name'
          error={false}
          errorText='Ошибка'
          size='default'
          extraClass='mt-6'
        />
        
        <EmailInput
          type='email'
          placeholder='E-mail'
          onChange={handleChange}
          value={values.email}
          name='email'
          error={false}
          errorText='Ошибка'
          size='default'
          extraClass='mt-6'
        />
        
        <PasswordInput
          type='password'
          placeholder='Пароль'
          onChange={handleChange}
          icon='ShowIcon'
          value={values.password}
          name='password'
          size='default'
          extraClass='mt-6'
        />

        <Button
          htmlType='submit'
          type='primary'
          extraClass='mt-6'
          size='medium'
        >
          Зарегистрироваться
        </Button>
        
      </form>

      <p className="text text_type_main-default text_color_inactive">
        Уже зарегистрированы? <Link to={ROUTES.login} className={styles.link}>Войти</Link>
      </p>

    </section>
  );
};

export default Register;