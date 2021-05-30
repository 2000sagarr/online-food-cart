import React from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import styles from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  // this useState is for button animation
  const [btnIsHighlited, setBtnIsHighlighted] = React.useState(false);
  // using useContext hook

  // to use context content useContext() is used
  const cartContext = React.useContext(CartContext);

  // updating amount of item in cart which is shown on cart button
  const numberOfCartItems = cartContext.items.reduce((currentNo, item) => {
    return currentNo + item.amount;
  }, 0);

  const btnClasses = `${styles.button} ${btnIsHighlited ? styles.bump : ""}`;

  // destructuring items from cartContext 
  const { items } = cartContext;
  // this useEffect is for animated button after adding item to cart
  React.useEffect(() => {
    // if cart is empty then effect is not work
    if (items.length === 0) {
      return;
    }

    // set button highlited true
    setBtnIsHighlighted(true);

    // above value is true for only 300 sec after that it set to false
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);
    
    // clean up timer
    return () =>{
      clearTimeout(timer);
    }
  }, [items]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
