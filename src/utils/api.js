const baseUrl = 'https://norma.nomoreparties.space/api/ingredients';
const orderPostUrl = 'https://norma.nomoreparties.space/api/orders';

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function getIngridients() {
  return fetch(baseUrl).then(checkReponse);
};

export function postOrder(orderData) {
  return fetch(orderPostUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ingredients: orderData
    })
  }).then(checkReponse);
};