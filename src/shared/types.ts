export interface orderData {
  country: string;
  deliveryMethod: string;
  name: string;
  street: string;
  zipCode: string;
}

export interface orders {
  archive: boolean;
  ingredients: { [key: string]: number };
  orderData: orderData;
  price: number;
  userId: string;
}
[];
