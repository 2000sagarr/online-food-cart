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
      {/* cart section start*/}
      {cartIsShown && <Cart onCloseCart = {hideCartHandler}/>}
      {/* cart section end*/}

      {/* header section start*/}
      <Header onShowCart= {showCartHanlder} />
      {/* header section end*/}

      {/* meals section start*/}
      <main>
        <Meals />
      </main>
      {/* meals section end*/}
    </CartProvider>
  );
}

export default App;
