import React from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = React.useState(false);

  const showCartHanlder = () => {
    setCartIsShown(true);
  };

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
