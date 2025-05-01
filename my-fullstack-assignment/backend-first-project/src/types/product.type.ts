export interface ProductModel {
  productId: string;
  name: string;
  price: number;
  categoryId: string;
  stock: number;
  data: any;
  createdAt: Date;
  updatedAt: Date;
}
