import { IError } from '@/interfaces/IError';
import { IWarning } from '@/interfaces/IWarning';
import { IUser } from '@/interfaces/IUser';

export interface IState {
  isAuth: boolean;
  userData: IUser | null;
  warnings: IWarning[];
  errors: IError[],
}
