import { postOrder, getOrder } from "../../utils/api";
import { IOrder } from "../types/order-type";
import { AppDispatch, AppThunk } from "../types/store-types";

export const POST_ORDER_REQUEST: 'POST_ORDER_REQUEST' = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS: 'POST_ORDER_SUCCESS' = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED: 'POST_ORDER_FAILED' = 'POST_ORDER_FAILED';
export const POST_ORDER_FAILED_MESSAGE = 'Ошибка отправки заказа';

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';
export const GET_ORDER_FAILED_MESSAGE = 'Ошибка получения информации о заказе';

interface IPostOrderRequest {
  readonly type: typeof POST_ORDER_REQUEST;
};

interface IPostOrderSuccess {
  readonly type: typeof POST_ORDER_SUCCESS;
  readonly payload: number;
};

interface IPostOrderFailed {
  readonly type: typeof POST_ORDER_FAILED;
};

interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
};

interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly payload: IOrder;
};

interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED;
};

export type TOrderActions = IPostOrderRequest
| IPostOrderSuccess
| IPostOrderFailed
| IGetOrderRequest
| IGetOrderSuccess
| IGetOrderFailed;

export const sendOrder: AppThunk = (orderData: string[]) => {
  return function(dispatch: AppDispatch) {
    dispatch({ type: POST_ORDER_REQUEST });
    postOrder(orderData).then(res => {
      if (res.success) {
        dispatch({
          type: POST_ORDER_SUCCESS,
          payload: res.order.number
        });
      } else {
        dispatch({
          type: POST_ORDER_FAILED
        });
      }
      
    }).catch(err => {
      dispatch({
        type: POST_ORDER_FAILED
      });
    });
  };
};

export const getOrderData: AppThunk = (orderNumber: string | undefined) => {
  return function(dispatch: AppDispatch) {
    dispatch({ type: GET_ORDER_REQUEST });
    getOrder(orderNumber).then(res => {
      dispatch({
        type: GET_ORDER_SUCCESS,
        payload: res.orders[0]
      });
    }).catch(err => {
      dispatch({
        type: GET_ORDER_FAILED
      });
    });
  };
};