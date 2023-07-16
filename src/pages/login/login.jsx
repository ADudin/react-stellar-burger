import styles from "./login.module.css";
import { Link } from "react-router-dom";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { 
  EmailInput,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";

import Loader from "../../components/loader/loader";
import { loginUser } from "../../services/actions/user";
import { ROUTES } from "../../utils/data";
import { useForm } from "../../hooks/useForm";

function Login() {
  const { values, handleChange } = useForm({
    email: '',
    password: ''
  });

  const { userRequest } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    evt => {
      evt.preventDefault();
      if (values.email !== '' && values.password !== '') {
        dispatch(loginUser(values));
      }
    }, [dispatch, values]
  );

  if (userRequest) {
    return (
      <Loader size="large" inverse={true} />
    );
  }

  return (
    <section className={styles.login}>

      <h1 className="text text_type_main-large">Вход</h1>

      <form onSubmit={onSubmit} className={`${styles.form} pb-20`}>
        
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
          Войти
        </Button>
        
      </form>

      <p className="text text_type_main-default text_color_inactive">
        Вы - новый пользователь? <Link to={ROUTES.register} className={styles.link}>Зарегистрироваться</Link>
      </p>

      <p className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль? <Link to={ROUTES.forgotPassword} className={styles.link}>Восстановить пароль</Link>
      </p>

    </section>
  );
};

export default Login;