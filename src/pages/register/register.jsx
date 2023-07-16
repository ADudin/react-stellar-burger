import styles from "./register.module.css";
import { Link } from "react-router-dom";
import { useState, useCallback } from "react";
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


function Register() {
  const [form, setValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { userRequest } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const onChange = evt => {
    setValue({
      ...form,
      [evt.target.name]: evt.target.value
    });
  };

  const onSubmit = useCallback(
    evt => {
      evt.preventDefault();
      if (form.email !== '' && form.password !== '' && form.name !== '') {
        dispatch(registerUser(form));
      }
    }, [dispatch, form]
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
          onChange={onChange}
          value={form.name}
          name='name'
          error={false}
          errorText='Ошибка'
          size='default'
          extraClass='mt-6'
        />
        
        <EmailInput
          type='email'
          placeholder='E-mail'
          onChange={onChange}
          value={form.email}
          name='email'
          error={false}
          errorText='Ошибка'
          size='default'
          extraClass='mt-6'
        />
        
        <PasswordInput
          type='password'
          placeholder='Пароль'
          onChange={onChange}
          icon='ShowIcon'
          value={form.password}
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