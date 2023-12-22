export interface IUser {
  id: string;
  accountId: string;
  name: string;
  surname: string;
  email: string;
  phone: string
  role: string
  avatar: string;
  restaurant: any[];
  birthday: string | null
  city: any,
  createdAt: Date
  visitAt: Date
}