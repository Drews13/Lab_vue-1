import { IProduct } from './IProduct';

export interface ICartItem {
  product: IProduct;
  categoryId: number,
  quantity: number
}
