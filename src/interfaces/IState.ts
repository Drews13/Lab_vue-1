import { IError } from '@/interfaces/IError';
import { IWarning } from '@/interfaces/IWarning';

export interface IState {
  isAuth: boolean;
  userData: {
    email: string;
    password: string;
  };
  warnings: IWarning[];
  errors: IError[],
}
