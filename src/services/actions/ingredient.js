export const SHOW_ITEM = 'SHOW_ITEM';
export const HIDE_ITEM = 'HIDE_ITEM';

export const showItem = (item) => {
  return {
    type: SHOW_ITEM,
    payload: item
  }
};

export const hideItem = () => {
  return {
    type: HIDE_ITEM
  }
};