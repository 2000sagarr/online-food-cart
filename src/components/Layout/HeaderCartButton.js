import React from "react";

import CartIcon from '../Cart/CartIcon';
import CartContext from "../../store/cart-context";
import styles from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  // using useContext hook
  const cartContext = React.useContext(CartContext);

  // const { items } = cartContext;
  console.log(cartContext.items)
  const numberOfCartItems = cartContext.items.reduce((currentNo, item) => {
    return currentNo + item.amount;
  }, 0);
  

  return (
    <button className={styles.button} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
