import React from "react";
import styles from "./MealItem.module.css";
import MealItemForm from './MealItemForm';

const MealItem = (props) => {
  const price = `Rs: ${props.price.toFixed(2)}`;
  return (
    <li className={styles.meal}>
      <div>
        <div>
          <h3>{props.name}</h3>
        </div>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id}/>
      </div>
    </li>
  );
};

export default MealItem;
