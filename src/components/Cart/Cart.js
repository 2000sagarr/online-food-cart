import React, { useContext, useState } from "react";
import styles from "./Cart.module.css";
import Modal from "./Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
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
    cartContext.addItem({ ...item, amount: 1 });
  };

  const submitOrderhandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://online-food-data-default-rtdb.firebaseio.com/order.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderItems: cartContext.items,
        }),
      }
    );

    setIsSubmitting(false);
    setDidSubmit(true);
    cartContext.clearCart();
  };

  // cart item list jsx
  const cartItems = cartContext.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      price={item.price}
      amount={item.amount}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
      onAdd={cartItemAddHandler.bind(null, item)}
    />
  ));

  const orderHandler = () => {
    setIsCheckOut(true);
  };

  const modalAction = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {hasItem && (
        <button className={styles["button"]} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      <ul className={styles["cart-items"]}>{cartItems}</ul>
      <div className={styles.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && (
        <Checkout onConfirm={submitOrderhandler} onCancel={props.onCloseCart} />
      )}
      {!isCheckOut && modalAction}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const ditSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onCloseCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onCloseCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && ditSubmitModalContent}
    </Modal>
  );
};

export default Cart;
