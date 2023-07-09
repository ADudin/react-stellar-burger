import styles from "./fogot-password.module.css";
import { Link } from "react-router-dom";
import { 
  EmailInput, 
  Button 
} from "@ya.praktikum/react-developer-burger-ui-components";

function ForgotPassword() {
  return (
    <section className={styles.container}>

      <h1 className="text text_type_main-large">Восстановление пароля</h1>

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

        <Button
          htmlType='submit'
          type='primary'
          extraClass='mt-6'
          size='medium'
        >
          Восстановить
        </Button>
      </form>

      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link>
      </p>

    </section>
  );
};

export default ForgotPassword;