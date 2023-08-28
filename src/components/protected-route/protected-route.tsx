import { useSelector } from "../../services/types/hooks";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../utils/data";

interface IProtected {
  onlyUnAuth: boolean,
  component: JSX.Element
}

interface IComponent{
  component: JSX.Element
}

const Protected = ({ onlyUnAuth = false, component }: IProtected): JSX.Element | null => {
  const user = useSelector(store => store.user.name);
  const location = useLocation();

  if (onlyUnAuth && user) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || {from: { pathname: ROUTES.main }};
    
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={ROUTES.login} state={{ from: location }} />;
  }

  // !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя
  return component;
};

//export const OnlyAuth = Protected;
export const OnlyAuth = ({component}: IComponent): JSX.Element | null => (
  <Protected onlyUnAuth={false} component={component} />
);

export const OnlyUnAuth = ({ component }: IComponent): JSX.Element | null => (
  <Protected onlyUnAuth={true} component={component} />
);