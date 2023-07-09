import styles from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { 
  EmailInput,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";

import Loader from "../../components/loader/loader";
import { loginUser } from "../../services/actions/user";

function Login() {
  const [form, setValue] = useState({
    email: '',
    password: ''
  });

  const { userRequest, authorized } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authorized) {
      navigate('/');
    }
  }, [authorized, navigate]);

  const onChange = evt => {
    setValue({
      ...form,
      [evt.target.name]: evt.target.value
    });
  }

  const login = useCallback(
    evt => {
      evt.preventDefault();
      if (form.email !== '' && form.password !== '') {
        dispatch(loginUser(form));
      }
    }, [dispatch, form]
  );

  if (userRequest) {
    return (
      <Loader size="large" inverse={true} />
    );
  }

  return (
    <section className={styles.login}>

      <h1 className="text text_type_main-large">Вход</h1>

      <form className={`${styles.form} pb-20`}>
        <label>
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
        </label>
        <label>
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
        </label>

        <Button
          htmlType='submit'
          type='primary'
          extraClass='mt-6'
          size='medium'
          onClick={login}
        >
          Войти
        </Button>
      </form>

      <p className="text text_type_main-default text_color_inactive">
        Вы - новый пользователь? <Link to='/register' className={styles.link}>Зарегистрироваться</Link>
      </p>

      <p className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль? <Link to='/forgot-password' className={styles.link}>Восстановить пароль</Link>
      </p>

    </section>
  );
};

export default Login;