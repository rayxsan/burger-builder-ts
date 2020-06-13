export interface OrderData {
  country: string;
  deliveryMethod: string;
  name: string;
  street: string;
  zipCode: string;
}

// This types encapsulates the data needed to create a new order
export interface OrderForm {
  ingredients: { [key: string]: number };
  price: number;
  orderData: OrderData;
  userId: string;
  version: number;
  archive: boolean;
}

// This is how Order are store in the DB
export type Order = OrderForm & { id: string };
