export const ROUTES = {
   main: '/',
   login: '/login',
   register: '/register',
   forgotPassword: '/forgot-password',
   resetPassword: '/reset-password',
   profile: '/profile',
   orders: '/orders',
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

export const WebsocketStatus  = {
   CONNECTING:  'CONNECTING...',
   ONLINE: 'ONLINE',
   OFFLINE: 'OFFLINE'
};