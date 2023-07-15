import styles from "./fogot-password.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { 
  EmailInput, 
  Button 
} from "@ya.praktikum/react-developer-burger-ui-components";

import Loader from "../../components/loader/loader";
import { forgotUserPassword } from "../../services/actions/user";
import { ROUTES } from "../../utils/data";

function ForgotPassword() {
  const [form, setValue] = useState({
    email: ''
  });

  const { userRequest, changePasswordRequestSent } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (changePasswordRequestSent) {
      navigate(ROUTES.resetPassword);
    }
  }, [navigate, changePasswordRequestSent]);

  const onChange = evt => {
    setValue ({
      ...form,
      [evt.target.name]: evt.target.value
    });
  };

  const launchPasswordChanging = useCallback(
    evt => {
      evt.preventDefault();
      if (form.email !== '') {
        dispatch(forgotUserPassword(form));
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

      <h1 className="text text_type_main-large">Восстановление пароля</h1>

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

        <Button
          htmlType='submit'
          type='primary'
          extraClass='mt-6'
          size='medium'
          onClick={launchPasswordChanging}
        >
          Восстановить
        </Button>
      </form>

      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль? <Link to={ROUTES.login} className={styles.link}>Войти</Link>
      </p>

    </section>
  );
};

export default ForgotPassword;