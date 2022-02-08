import { IProduct } from './IProduct';

export interface IOrder {
  id: number,
  userId: number,
  userName: string,
  userSurame: string,
  deliveryAddress: string,
  deliveryDay: string,
  phoneNumber: string,
  orderedItems: IProduct[],
  totalCost: string
}
