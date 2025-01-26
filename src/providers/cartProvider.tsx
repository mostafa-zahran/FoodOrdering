import { createContext, PropsWithChildren, useState } from "react";
import { useContext } from "react";
import { CartItem, PizzaSize, Tables } from '../types';
import { randomUUID } from 'expo-crypto';
import { useInsertOrder } from "../api/orders/create";
import { useRouter } from "expo-router";
import { useInsertOrderItem } from "../api/order_items/create";

type CartType = {
    items: CartItem[];
    onAddItem: (product: Tables<'products'>, size: PizzaSize ) => void;
    onUpdateQuantity: (id: string, amount: -1 | 1) => void;
    total: number;
    checkout: () => void;
};

const CartContext = createContext<CartType>({
    items: [],
    onAddItem: () => {},
    onUpdateQuantity: () => {},
    total: 0,
    checkout: () => {},
});

const CartProvider = ({children} : PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const {mutate: insertOrder} = useInsertOrder();
  const {mutate: insertOrderItems} = useInsertOrderItem();
  const router = useRouter();
  const addItem = (product: Tables<'products'>, size: PizzaSize) => {
    const existingItem = items.find((item) => item.product_id === product.id && item.size === size);
    if (existingItem) {
        updateQuantity(existingItem.id, 1);
        return;
    }
    const newCartItem: CartItem = {
        id: randomUUID(),
        product: product,
        product_id: product.id,
        size: size,
        quantity: 1,
    }
    setItems([newCartItem, ...items]);
  }

  const updateQuantity = (id: string, amount: -1 | 1) => {
    const newItems = items.map((item) => {
        if (item.id === id) {
            return {
                ...item,
                quantity: item.quantity + amount,
            }
        }else {
          return item;
        }
        return item;
    }).filter((item) => item.quantity > 0);
    setItems(newItems);
  }

  const total = items.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity);
  }, 0);

  const clearCart = () => {
    setItems([]);
  };
  const onCheckout = () => {
    insertOrder({total}, {
      onSuccess: (data) => {
        insertOrderItems(
          items.map((item) => {
            return {
              order_id: data.id, 
              size: item.size, 
              quantity: item.quantity, 
              product_id: item.product_id
            };
          }),{
            onSuccess: () => {
              clearCart();
              router.push(`/(user)/orders/${data.id}`);
            }
          }
        )
      }
    });
  }
  return (
    <CartContext.Provider value={{ items: items, onAddItem: addItem, onUpdateQuantity: updateQuantity, total, checkout: onCheckout}} >
        {children}
    </CartContext.Provider>
  )
}

export default CartProvider;

export const useCart = () => useContext(CartContext);