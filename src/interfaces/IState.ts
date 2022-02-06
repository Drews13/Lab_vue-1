import { IError } from '@/interfaces/IError';
import { IWarning } from '@/interfaces/IWarning';
import { IUser } from '@/interfaces/IUser';
import { IProduct } from './IProduct';

export interface IState {
  isAuth: boolean;
  userData: IUser | null;
  cartItems: IProduct[];
  warnings: IWarning[];
  errors: IError[];
}
