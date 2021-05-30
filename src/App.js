import React from "react";

// import components
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

// component function
function App() {
  // state management
  const [cartIsShown, setCartIsShown] = React.useState(false);

  // cart handler functions
  // showFunction
  const showCartHanlder = () => {
    setCartIsShown(true);
  };

  // hide function
  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  // return data
  return (
    <CartProvider>
      {cartIsShown && <Cart onCloseCart = {hideCartHandler}/>}

      <Header onShowCart= {showCartHanlder} />

      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
