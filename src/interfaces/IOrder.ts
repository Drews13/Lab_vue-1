import { ICartItem } from './ICartItem';

export interface IOrder {
  id: number,
  userId: number,
  userName: string,
  userSurame: string,
  deliveryAddress: string,
  deliveryDay: string,
  phoneNumber: string,
  orderedItems: ICartItem[],
  totalCost: string
}
