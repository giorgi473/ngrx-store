import { Product } from "../../products/types/product-type"

export type CartItem = {
  product: Product;
  quantity: number;
}
