export interface IQuestion {
  id: string;
  category: string;
  subcategory: any[];
  question: string;
  balls: string;
  priority?: number;
  type: string;
}

export interface IQuestionnaire {
  id: string;
  category: any;
  categoryId: string;
  name: string;
  questions: IQuestion[];
}

export interface IModeration {
  client: Object,
  task: ITask,
  review: string;
  receipt: string;
  questions: any[];
  responses: any[];
  report: any
}

export interface ICreateOrder {
  restaurantId: string,
  amount: number,
  typePayment: string,
  quantityShoppers: number,
  questionnaire: IQuestionnaire
}

export interface ICreateCoupon {
  restaurantId: string,
  amount: number,
  typePayment: string,
  quantityShoppers: number,
  questionnaire: IQuestionnaire,
  paymentNumber: string
}

export interface IBid {
  name: string;
}

export interface IRaffle {
  name: string;
}

export interface ITask {
  name: string;
}

export interface IReceipt {
  name: string;
}