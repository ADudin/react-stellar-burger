import { IOrder } from "./order-type";

export interface IOrders {
  orders: IOrder[];
  success: boolean;
  total: number;
  totalToday: number;
};