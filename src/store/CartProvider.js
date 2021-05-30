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
    // adding the price of item to total price
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    // if given item present in list then return its id
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    // getting data of existing item using existingCartItemIndex
    // if existingCartItemIndex is undefined then existingCartItem alos undefined
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;
    // if given item is exist i.e existingCartItem contain some data
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        // amount is quantity
        amount: existingCartItem.amount + action.item.amount,
      };
      // now copy all data of state.items to updatedItems
      updatedItems = [...state.items];

      // now change data at existingCartItemIndex to updatedItem
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    // if given item is not present in the list concat item to state.item
    else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    // if given item present in list then return its id
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedItems;
    if(existingCartItem.amount === 1){
      updatedItems = state.items.filter(item => item.id !== action.id);
    }else{
      const updatedItem = {...existingCartItem, amount : existingCartItem.amount - 1};
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return{
      items : updatedItems,
      totalAmount : updatedTotalAmount
    }


  }
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
