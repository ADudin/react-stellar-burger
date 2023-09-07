import {
  ORDER_FEED_CONNECT,
  ORDER_FEED_DISCONNECT,
  ORDER_FEED_WS_CONNECTING,
  ORDER_FEED_WS_OPEN,
  ORDER_FEED_WS_CLOSE,
  ORDER_FEED_WS_MESSAGE,
  ORDER_FEED_WS_ERROR
} from "../actions/order-feed";

export type TWSActions = {
  wsConnect: typeof ORDER_FEED_CONNECT;
  wsDisconnect: typeof ORDER_FEED_DISCONNECT;
  wsConnecting: typeof ORDER_FEED_WS_CONNECTING;
  onOpen: typeof ORDER_FEED_WS_OPEN;
  onClose: typeof ORDER_FEED_WS_CLOSE;
  onMessage: typeof ORDER_FEED_WS_MESSAGE;
  onError: typeof ORDER_FEED_WS_ERROR;
};