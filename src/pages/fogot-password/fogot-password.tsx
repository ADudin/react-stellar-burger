import styles from "./fogot-password.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useEffect, FC } from "react";
import { useDispatch, useSelector } from "../../services/types/hooks";

import { 
  EmailInput, 
  Button 
} from "@ya.praktikum/react-developer-burger-ui-components";

import Loader from "../../components/loader/loader";
import { forgotUserPassword } from "../../services/actions/user";
import { ROUTES } from "../../utils/data";
import { useForm } from "../../hooks/useForm";

const ForgotPassword: FC = () => {
  const { userRequest, changePasswordRequestSent } = useSelector(state => state.user);
  const { values, handleChange } = useForm({
    email: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (changePasswordRequestSent) {
      navigate(ROUTES.resetPassword);
    }
  }, [navigate, changePasswordRequestSent]);

  const onSubmit = useCallback(
    evt => {
      evt.preventDefault();
      if (values.email !== '') {
        dispatch(forgotUserPassword(values));
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

      <h1 className="text text_type_main-large">Восстановление пароля</h1>

      <form onSubmit={onSubmit} className={`${styles.form} pb-20`}>
        
        <EmailInput
          placeholder='E-mail'
          onChange={handleChange}
          value={values.email}
          name='email'
          size='default'
          extraClass='mt-6'
        />

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
        Вспомнили пароль? <Link to={ROUTES.login} className={styles.link}>Войти</Link>
      </p>

    </section>
  );
};

export default ForgotPassword;