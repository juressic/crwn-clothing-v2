import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/086 crown.svg';
import { UserContext } from '../../context/user.context';
import CartIcon from '../../components/cart-icon.component/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../context/cart.context';

import './navigation.styles.scss';

const Navigation = (props) => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="shop">
            <div>Shop</div>
          </Link>
          {currentUser ? (
            <span className="nav-link">SignOut</span>
          ) : (
            <Link className="nav-link" to="auth">
              <div>SignIn</div>
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>

      <Outlet />
    </Fragment>
  );
};

export default Navigation;
