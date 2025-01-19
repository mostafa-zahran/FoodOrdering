import { createContext, PropsWithChildren, useState } from "react";
import { useContext } from "react";
import { CartItem, Product, PizzaSize } from '../types';
import { randomUUID } from 'expo-crypto';

type CartType = {
    items: CartItem[];
    onAddItem: (product: Product, size: PizzaSize ) => void;
    onUpdateQuantity: (id: string, amount: -1 | 1) => void;
};

const CartContext = createContext<CartType>({
    items: [],
    onAddItem: () => {},
    onUpdateQuantity: () => {},
});

const CartProvider = ({children} : PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: PizzaSize) => {
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

  return (
    <CartContext.Provider value={{ items: items, onAddItem: addItem, onUpdateQuantity: updateQuantity}} >
        {children}
    </CartContext.Provider>
  )
}

export default CartProvider;

export const useCart = () => useContext(CartContext);