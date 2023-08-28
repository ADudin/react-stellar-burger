import { IIngredient } from "../types/inrgedient-type";

export const ADD_ITEM: 'ADD_ITEM' = 'ADD_ITEM';
export const REMOVE_ITEM: 'REMOVE_ITEM' = 'REMOVE_ITEM';
export const MOVE_ITEM: 'MOVE_ITEM' = 'MOVE_ITEM';
export const RESET_ITEMS: 'RESET_ITEMS' = 'RESET_ITEMS';

interface IAddItem {
  readonly type: typeof ADD_ITEM;
  readonly payload: IIngredient;
};

interface IRemoveItem {
  readonly type: typeof REMOVE_ITEM;
  readonly payload: string;
};

interface IMoveItem {
  readonly type: typeof MOVE_ITEM;
  readonly payload: {'dragIndex': number, 'hoverIndex': number};
};

interface IResetItems {
  readonly type: typeof RESET_ITEMS;
};

export type TBurgerConstructorActions = IAddItem
| IRemoveItem
| IMoveItem
| IResetItems;

export const addItem = (item: IIngredient): IAddItem => {
  return {
    type: ADD_ITEM,
    payload: item
  };
};

export const removeItem = (item: IIngredient): IRemoveItem => {
  return {
    type: REMOVE_ITEM,
    payload: item.key
  };
};

export const moveItem = (index: {'dragIndex': number, 'hoverIndex': number}): IMoveItem => {
  return {
    type: MOVE_ITEM,
    payload: index
  };
};

export const resetItems = (): IResetItems => {
  return {
    type: RESET_ITEMS
  };
};