import {
  CartItemContainer,
  Img,
  ItemDetails,
  ItemName,
} from './cart-item.style';

const CartItem = ({ product }) => {
  const { name, price, imageUrl, quantity } = product;
  return (
    <CartItemContainer>
      <Img src={imageUrl} alt={name} />
      <ItemDetails>
        <ItemName>{name}</ItemName>
        <span className="price">
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
