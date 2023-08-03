import { postOrder, getOrder } from "../../utils/api";

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';
export const POST_ORDER_FAILED_MESSAGE = 'Ошибка отправки заказа';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const GET_ORDER_FAILED_MESSAGE = 'Ошибка получения информации о заказе';

export function sendOrder(orderData) {
  return function(dispatch) {
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

export function getOrderData(orderNumber) {
  return function(dispatch) {
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