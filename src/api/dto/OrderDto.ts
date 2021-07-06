export enum OrderStatus {
  New = 'NEW',
  Processing = 'PROCESSING',
  Completed = 'COMPLETED',
  Cancelled = 'CANCELLED',
}

export interface OrderDto {
  id: number;
  items: {
    product: {
      id: number;
      name: string;
      pictureFilename: string | null;
      price: number;
    };
    count: number;
  }[];
  client: {
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
  };
  status: OrderStatus;
  createdAt: Date;
}
