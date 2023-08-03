export const ORDER_FEED_CONNECT = 'ORDER_FEED_CONNECT';
export const ORDER_FEED_DISCONNECT = 'ORDER_FEED_DISCONNECT';
export const ORDER_FEED_WS_CONNECTING = 'ORDER_FEED_WS_CONNECTING';
export const ORDER_FEED_WS_OPEN = 'ORDER_FEED_WS_OPEN';
export const ORDER_FEED_WS_CLOSE = 'ORDER_FEED_WS_CLOSE';
export const ORDER_FEED_WS_MESSAGE = 'ORDER_FEED_WS_MESSAGE';
export const ORDER_FEED_WS_ERROR = 'ORDER_FEED_WS_ERROR';

export const wsConnect = (url) => ({
  type: ORDER_FEED_CONNECT,
  payload: url
});

export const wsDisconnect = () => ({
  type: ORDER_FEED_DISCONNECT
});