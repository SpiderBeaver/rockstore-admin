export interface ProductDto {
  id: number;
  name: string;
  sku: string;
  description: string | null;
  pictureFilename: string | null;
  price: number;
  inStock: number;
}
