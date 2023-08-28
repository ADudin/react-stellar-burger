import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { store } from "../store/store";
import { TBurgerConstructorActions } from "../actions/burger-constructor";
import { TIngredientActions } from "../actions/ingredient";
import { TIngredientsActions } from "../actions/ingredients";
import { TOrderFeedActions } from "../actions/order-feed";
import { TOrderActions } from "../actions/order";
import { TUserActions } from "../actions/user";

type TApplicationActions = TBurgerConstructorActions
| TIngredientActions
| TIngredientsActions
| TOrderFeedActions
| TOrderActions
| TUserActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, Action, RootState, TApplicationActions>>;