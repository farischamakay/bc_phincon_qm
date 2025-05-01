export interface CartModel {
  cartId: string;
  userId: string;
  productId: string;
  qty: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}
