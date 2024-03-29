import styles from "./app.module.css";

import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect, FC } from "react";
import { useDispatch } from "react-redux";

import AppHeader from "../app-header/app-header";
import Home from "../../pages/home/home";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Ingredient from "../../pages/ingredient/ingredient";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ErrorPage from "../../pages/error/error";
import ForgotPassword from "../../pages/fogot-password/fogot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import ProfileUser from "../profile-user/profile-user";
import Feed from "../../pages/feed/feed";
import OrderInfo from "../order-info/order-info";
import Order from "../../pages/order/order";
import OrderHistory from "../order-history/order-history";

import { getItems } from "../../services/actions/ingredients";
import { ROUTES, TOKENS } from "../../utils/data";
import { checkUserAuth } from "../../services/actions/user";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";

const App: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getItems());
    if (localStorage.getItem(TOKENS.accessToken)) {
      dispatch(checkUserAuth());
    }
  }, [dispatch]);

  return (
    <div className={styles.app}>
        <DndProvider backend={HTML5Backend}>
          <AppHeader />
          <Routes location={background || location}>
            <Route path={ROUTES.main} element={<Home />} />
            <Route path={ROUTES.ingredient} element={<Ingredient />} />
            <Route path={ROUTES.order} element={<Order />} />
            <Route path={ROUTES.userOrder} element={<OnlyAuth component={<Order />} />} />
            <Route path={ROUTES.login} element={<OnlyUnAuth component={<Login />} />} />
            <Route path={ROUTES.register} element={<OnlyUnAuth component={<Register />} />} />
            <Route path={ROUTES.forgotPassword} element={<OnlyUnAuth component={<ForgotPassword />} />} />
            <Route path={ROUTES.resetPassword} element={<ResetPassword />} />
            <Route path={ROUTES.profile} element={<OnlyAuth component={<Profile />} />}>
              <Route path={ROUTES.profile} element={<OnlyAuth component={<ProfileUser />} />} />
              <Route path={ROUTES.orderHistory} element={<OnlyAuth component={<OrderHistory />} />} />
            </Route>
            <Route path={ROUTES.error} element={<ErrorPage />} />
            <Route path={ROUTES.feed} element={<Feed />} />
          </Routes>
          {
            background && (
              <Routes>
                <Route
                  path={ROUTES.ingredient}
                  element={
                    <Modal closeModal={handleModalClose}>
                      <IngredientDetails />
                    </Modal>
                  }
                />
                <Route 
                  path={ROUTES.order}
                  element={
                    <Modal closeModal={handleModalClose}>
                      <OrderInfo />
                    </Modal>
                  }
                />
                <Route 
                  path={ROUTES.userOrder}
                  element={
                    <OnlyAuth 
                      component={
                        <Modal closeModal={handleModalClose}>
                          <OrderInfo />
                        </Modal>
                      }
                    />
                  }
                />
              </Routes>
            )
          }
        </DndProvider>
    </div>
  );
}

export default App;