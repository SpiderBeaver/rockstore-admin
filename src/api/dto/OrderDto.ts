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
  createdAt: Date;
}
