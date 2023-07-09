import styles from "./register.module.css";
import { Link } from "react-router-dom";
import {
  Input, 
  EmailInput,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";

function Register() {
  return (
    <section className={styles.container}>

      <h1 className="text text_type_main-large">Регистрация</h1>

      <form className={`${styles.form} pb-20`}>
        <label>
          <Input
            type='text'
            placeholder='Имя'
            onChange={() => {}}
            value={''}
            name='name'
            error={false}
            errorText='Ошибка'
            size='default'
            extraClass='mt-6'
          />
        </label>
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
          Зарегистрироваться
        </Button>
      </form>

      <p className="text text_type_main-default text_color_inactive">
        Уже зарегистрированы? <Link to='/login' className={styles.link}>Войти</Link>
      </p>

    </section>
  );
};

export default Register;