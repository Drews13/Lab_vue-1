import { IError } from '@/interfaces/IError';
import { IWarning } from '@/interfaces/IWarning';
import { IUser } from '@/interfaces/IUser';
import { ICartItem } from './ICartItem';

export interface IState {
  isAuth: boolean;
  userData: IUser | null;
  cartItems: ICartItem[];
  warnings: IWarning[];
  errors: IError[];
}
