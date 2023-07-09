import styles from "./login.module.css";
import { Link } from "react-router-dom";
import { 
  EmailInput,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";

function Login() {
  return (
    <section className={styles.login}>

      <h1 className="text text_type_main-large">Вход</h1>

      <form className={`${styles.form} pb-20`}>
        <label>
          <EmailInput
            type='email'
            placeholder='E-mail'
            onChange={() => {}}
            value={''}
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
            onChange={() => {}}
            icon='ShowIcon'
            value={''}
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