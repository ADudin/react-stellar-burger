export const ROUTES = {
   main: '/',
   login: '/login',
   register: '/register',
   forgotPassword: '/forgot-password',
   resetPassword: '/reset-password',
   profile: '/profile',
   orderHistory: '/profile/orders',
   orders: '/orders',
   order: '/feed/:id',
   ingredients: '/ingredients',
   ingredient: '/ingredients/:ingredientId',
   feed: '/feed',
   error: '*'
}

export const TOKENS = {
   accessToken: 'accessToken',
   refreshToken: 'refreshToken'
};

export const wsOrdersUrl = 'wss://norma.nomoreparties.space/orders/all';
export const BASE_WS_ORDERS_URL = 'wss://norma.nomoreparties.space/orders';
export const ALL_WS_ORDERS_ENDPOINT = '/all';

export const WebsocketStatus  = {
   CONNECTING:  'CONNECTING...',
   ONLINE: 'ONLINE',
   OFFLINE: 'OFFLINE'
};