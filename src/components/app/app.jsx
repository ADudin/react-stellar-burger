import styles from "./app.module.css";

import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

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
import { ROUTES } from "../../utils/data";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
        <DndProvider backend={HTML5Backend}>
          <AppHeader />
          <Routes location={background || location}>
            <Route path={ROUTES.main} element={<Home />} />
            <Route path={ROUTES.ingredient} element={<Ingredient />} />
            <Route path={ROUTES.login} element={<Login />} />
            <Route path={ROUTES.register} element={<Register />} />
            <Route path={ROUTES.forgotPassword} element={<ForgotPassword />} />
            <Route path={ROUTES.resetPassword} element={<ResetPassword />} />
            <Route path={ROUTES.profile} element={<Profile />} />
            <Route path={ROUTES.error} element={<ErrorPage />} />
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
              </Routes>
            )
          }
        </DndProvider>
    </div>
  );
}

export default App;