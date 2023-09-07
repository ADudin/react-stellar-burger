import { IOrders } from "../types/orders-type";

export const ORDER_FEED_CONNECT: 'ORDER_FEED_CONNECT' = 'ORDER_FEED_CONNECT';
export const ORDER_FEED_DISCONNECT: 'ORDER_FEED_DISCONNECT' = 'ORDER_FEED_DISCONNECT';
export const ORDER_FEED_WS_CONNECTING: 'ORDER_FEED_WS_CONNECTING' = 'ORDER_FEED_WS_CONNECTING';
export const ORDER_FEED_WS_OPEN: 'ORDER_FEED_WS_OPEN' = 'ORDER_FEED_WS_OPEN';
export const ORDER_FEED_WS_CLOSE: 'ORDER_FEED_WS_CLOSE' = 'ORDER_FEED_WS_CLOSE';
export const ORDER_FEED_WS_MESSAGE: 'ORDER_FEED_WS_MESSAGE' = 'ORDER_FEED_WS_MESSAGE';
export const ORDER_FEED_WS_ERROR: 'ORDER_FEED_WS_ERROR' = 'ORDER_FEED_WS_ERROR';

interface IOrderFeedConnect {
  readonly type: typeof ORDER_FEED_CONNECT;
  readonly payload: string;
};

interface IOrderFeedDisconnect {
  readonly type: typeof ORDER_FEED_DISCONNECT;
};

interface IOrderFeedWSConnecting {
  readonly type: typeof ORDER_FEED_WS_CONNECTING;
};

interface IOrederFeedWSOpen {
  readonly type: typeof ORDER_FEED_WS_OPEN;
};

interface IOrderFeedWSClose {
  readonly type: typeof ORDER_FEED_WS_CLOSE;
};

interface IOrderFeedWSMessage {
  readonly type: typeof ORDER_FEED_WS_MESSAGE;
  readonly payload: IOrders;
};

interface IOrderFeedWSError {
  readonly type: typeof ORDER_FEED_WS_ERROR;
  readonly payload: string;
};

export type TOrderFeedActions = IOrderFeedConnect
| IOrderFeedDisconnect
| IOrderFeedWSConnecting
| IOrederFeedWSOpen
| IOrderFeedWSClose
| IOrderFeedWSMessage
| IOrderFeedWSError;

export const wsConnect = (url: string): IOrderFeedConnect => ({
  type: ORDER_FEED_CONNECT,
  payload: url
});

export const wsDisconnect = (): IOrderFeedDisconnect => ({
  type: ORDER_FEED_DISCONNECT
});