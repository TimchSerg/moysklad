export interface ICreateOrderResponse {}

export interface IStateOrder {
  id: string;
  accountId: string;
  name: string;
  stateType: string;
  entityType: string;
}

export interface IPosition {
  id: string;
  name: string;
  assortmentId: string;
  quantity: number;
  price: number;
  vat: number;
}

export interface IOrder{
  id: string;
  name: string;
  agent: string;
  sum: number;
  positions: IPosition[];
  state: IStateOrder;
  updated: string;
  created: "2023-03-13T07:19:16.279Z"
}