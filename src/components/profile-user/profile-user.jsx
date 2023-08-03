import styles from "./profile-user.module.css";
import { useSelector, useDispatch } from "react-redux";

import { 
  Input,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";

import { updateUserData } from "../../services/actions/user";
import { useForm } from "../../hooks/useForm";

function ProfileUser() {
  const { name, email } = useSelector(state => state.user);
  const { values, handleChange, setValues } = useForm({
    name: name,
    email: email,
    password: ''
  });

  const dispatch = useDispatch();

  const onReset = () => {
    setValues({
      name: name,
      email: email,
      password: ''
    });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    dispatch(updateUserData(values));
  }

  return (
    <form onSubmit={onSubmit}>

      <Input
        type='text'
        placeholder='Имя'
        onChange={handleChange}
        value={values.name}
        name='name'
        error={false}
        errorText='Ошибка'
        size='default'
        icon='EditIcon'
      />

      <Input
        type='email'
        placeholder='Логин'
        onChange={handleChange}
        value={values.email}
        name='email'
        error={false}
        errorText='Ошибка'
        size='default'
        extraClass='mt-6'
        icon='EditIcon'
      />

      <Input
        type='password'
        placeholder='Пароль'
        onChange={handleChange}
        icon='EditIcon'
        value={values.password}
        name='password'
        size='default'
        extraClass='mt-6'
      />

      <div className={
        values.name === name && values.email === email && values.password === '' ?
        `${styles.buttons__container}` :
        `${styles.buttons__container_active} mt-6`
      }>

        <button
          className={`${styles.button} text text_type_main-default pt-4 pb-4 pl-2 pr-2 mr-6`}
          type='reset'
          size='medium'
          onClick={onReset}
        >
          Отмена
        </button>

        <Button
          htmlType='submit'
          type='primary'
          size='medium'
        >
          Сохранить
        </Button>

      </div>

    </form>
  );
};

export default ProfileUser;