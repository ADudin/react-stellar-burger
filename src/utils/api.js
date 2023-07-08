const baseUrl = 'https://norma.nomoreparties.space/api';
const ingredientsEndPoint = 'ingredients';
const orderPostEndPoint = 'orders';

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

function request(endpoint, options) {
  return fetch(`${baseUrl}/${endpoint}`, options).then(checkReponse);
}

export function getIngredients() {
  return request(ingredientsEndPoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export function postOrder(orderData) {
  return request(orderPostEndPoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ingredients: orderData
    })
  });
};