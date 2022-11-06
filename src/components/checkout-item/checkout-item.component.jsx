import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import './checkout-item.style.scss';

const CheckoutItem = ({ cartItem }) => {
  const { imageUrl, name, price, quantity } = cartItem;
  const { addItemToCart, deleteItemFromCart, removeItemFromCart } =
    useContext(CartContext);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <span className="arrow" onClick={() => removeItemFromCart(cartItem)}>
          &#10094;
        </span>
        <span className="value">{quantity}</span>

        <span className="arrow" onClick={() => addItemToCart(cartItem)}>
          &#10095;
        </span>
      </span>
      <span className="price">{price}</span>
      <button onClick={() => deleteItemFromCart(cartItem)}>&#10005;</button>
    </div>
  );
};

export default CheckoutItem;
