import React from "react";

import HeaderCartButton from './HeaderCartButton';
import styles from "./Header.module.css";
import mealImage from "../../assets/meals.jpg";

const Header = () => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton/>
      </header>
      <div className={styles["main-image"]}>
        <img src={mealImage} alt="A table full of delicious food!" />
      </div>
    </React.Fragment>
  );
};

export default Header;
