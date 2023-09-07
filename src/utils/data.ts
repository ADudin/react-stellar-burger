export enum ROUTES {
   main = '/',
   login = '/login',
   register = '/register',
   forgotPassword = '/forgot-password',
   resetPassword = '/reset-password',
   profile = '/profile',
   orderHistory = '/profile/orders',
   userOrder = '/profile/orders/:id',
   orders = '/orders',
   feed = '/feed',
   order = '/feed/:id',
   ingredients = '/ingredients',
   ingredient = '/ingredients/:ingredientId',
   error = '*'
};

export enum TOKENS {
   accessToken = 'accessToken',
   refreshToken = 'refreshToken'
};

export const BASE_WS_ORDERS_URL = 'wss://norma.nomoreparties.space/orders';
export const ALL_WS_ORDERS_ENDPOINT = '/all';

export enum WebsocketStatus {
   CONNECTING = 'CONNECTING...',
   ONLINE = 'ONLINE',
   OFFLINE = 'OFFLINE'
};