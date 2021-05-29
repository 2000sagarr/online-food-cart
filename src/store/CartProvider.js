import React from "react";
import CartContext from "./cart-context";

// notes :
// defaultCartState : provide default values to reducer and to return default value in cartReducer
// cartReducer : it is the first arg of useReducer hook.
// const cartReducer = (state, action) : here state gives previous state values
// to get the values of reducer use cartState

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
      // const updatedItems = state.item + action.item;
      const updatedItems = state.items.concat(action.item);

      const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
      return {
          items : updatedItems,
          totalAmount : updatedTotalAmount  
      };
  }

  // if (action.type === "REMOVE") {
  // }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = React.useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
