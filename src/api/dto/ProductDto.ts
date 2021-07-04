export interface ProductDto {
  id: number;
  name: string;
  sku: string;
  description: string | null;
  pictureFilename: string;
  price: number;
  inStock: number;
}
