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
            <Route path='/' element={<Home />} />
            <Route path='/ingredients/:ingredientId' element={<Ingredient />} />
            <Route path='/login' element={<Login />} />
          </Routes>
          {
            background && (
              <Routes>
                <Route
                  path='/ingredients/:ingredientId'
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