import { IPaymentCard } from '@/interfaces/IPaymentCard';

export interface IUser {
  id: number | null;
  login: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  sex: string;
  age: string;
  address: string;
  shippingAddress: string;
  paymentCard: IPaymentCard | null;
}
