import { createContext, useEffect, useState } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  //find if cartItem contains product to add
  const added = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

  //if found, increment quantity
  if (added) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  //return new array with modified cartItems / new cartItems
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  setCartItems: () => {},
  cartCount: 0,
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  deleteItemFromCart: () => {},
  cartCount: 0,
  totalPrice: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartTotal);
    totalCartPrice();
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
    console.log(cartItems);
  };

  const removeItemFromCart = (cartItemToRemove) => {
    if (cartItemToRemove.quantity === 1) {
      return deleteItemFromCart(cartItemToRemove);
    }
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const deleteItemFromCart = (cartItem) => {
    setCartItems(cartItems.filter((item) => cartItem.id !== item.id));
  };

  const totalCartPrice = () => {
    if (cartItems.length === 0) return;

    const total = cartItems.reduce(
      (total, cartItem) => (total = total + cartItem.price * cartItem.quantity),
      0
    );
    setTotalPrice(total);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    deleteItemFromCart,
    totalPrice,
    removeItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
