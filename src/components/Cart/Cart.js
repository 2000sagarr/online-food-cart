import React, { useContext } from "react";
import styles from "./Cart.module.css";
import Modal from "./Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  // item context
  const cartContext = useContext(CartContext);

  // total amount of all items
  const totalAmount = `Rs${cartContext.totalAmount.toFixed(2)}`;

  // items are present in cart or not
  const hasItem = cartContext.items.length > 0;

  // remove item from cart using id
  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };

  // add item to cart using item
  const cartItemAddHandler = (item) => {
    cartContext.addItem({...item, amount: 1});
  };

  // cart item list jsx
  const cartItems = cartContext.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      price={item.price}
      amount={item.amount}
      onRemove = {cartItemRemoveHandler.bind(null, item.id)}
      onAdd = {cartItemAddHandler.bind(null, item)}
    />
  ));

  return (
    <Modal onClose={props.onCloseCart}>
      <ul className={styles["cart-items"]}>{cartItems}</ul>
      <div className={styles.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onCloseCart}>
          Close
        </button>
        {hasItem && <button className={styles["button"]}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
