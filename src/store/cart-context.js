import React from 'react';

//this just a dummy initialization
const CartContext = React.createContext({
    items : [],
    totalAmount : 0,
    addItem : (item) => {},
    removeItem : (id) => {},
    clearCart : () =>{ }
});

export default CartContext;