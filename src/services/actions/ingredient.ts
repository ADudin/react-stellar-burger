import { IIngredient } from "../types/inrgedient-type";

export const SHOW_ITEM: 'SHOW_ITEM' = 'SHOW_ITEM';
export const HIDE_ITEM: 'HIDE_ITEM' = 'HIDE_ITEM';

interface IShowItem {
  readonly type: typeof SHOW_ITEM;
  readonly payload: IIngredient;
};

interface IHideItem {
  readonly type: typeof HIDE_ITEM;
}

export type TIngredientActions = IShowItem | IHideItem;

export const showItem = (item: IIngredient): IShowItem => {
  return {
    type: SHOW_ITEM,
    payload: item
  };
};

export const hideItem = (): IHideItem => {
  return {
    type: HIDE_ITEM
  };
};