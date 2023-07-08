export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const MOVE_ITEM = 'MOVE_ITEM';
export const RESET_ITEMS = 'RESET_ITEMS';

export const addItem = (item) => {
  return {
    type: ADD_ITEM,
    payload: item
  };
};

export const removeItem = (item) => {
  return {
    type: REMOVE_ITEM,
    payload: item.key
  };
};

export const moveItem = (index) => {
  return {
    type: MOVE_ITEM,
    payload: index
  };
};

export const resetItems = () => {
  return {
    type: RESET_ITEMS
  };
};