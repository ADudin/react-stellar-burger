import PropTypes from "prop-types";

export const ingredientPropType = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number
});

export const orderPropType = PropTypes.shape({
  ingredients: PropTypes.array,
  _id: PropTypes.string,
  status: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.number,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string
});