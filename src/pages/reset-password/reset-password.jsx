import styles from "./reset-password.module.css";
import { Link } from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";

function ResetPassword() {
  return (
    <section className={styles.container}>

      <h1 className="text text_type_main-large">Восстановление пароля</h1>

      <form className={`${styles.form} pb-20`}>
        <label>
          <PasswordInput
            type='password'
            placeholder='Введите новый пароль'
            onChange={() => {}}
            icon='ShowIcon'
            value={''}
            name='password'
            size='default'
            extraClass='mt-6'
          />
        </label>
        <label>
          <Input
            type='text'
            placeholder='Введите код из письма'
            onChange={() => {}}
            value={''}
            name='code'
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
        >
          Сохранить
        </Button>
      </form>

      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link>
      </p>

    </section>
  );
};

export default ResetPassword;