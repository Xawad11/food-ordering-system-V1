import React from "react";
import { Link } from "react-router-dom";
import Price from "../../components/Price/Price";
import Title from "../../components/Title/Title";
import { useCart } from "../../hooks/useCart";
import classes from "./cartPage.module.css";
import NotFound from "../../components/NotFound/NotFound";

export default function CartPage() {
  const { cart, removeFromCart, changeQuantity } = useCart();

  return (
    <>
      <Title title="Cart Page" margin="1.5rem 0 0 2.5rem" />

      {cart.items.length === 0 ? (
        <NotFound message="Cart Page is Empty !" />
      ) : (
        <div className={classes.container}>
          <ul className={classes.list}>
            {cart.items.map((item) => (
              <li key={item.food.id} className={classes.cartItem}>
                <div className={classes.imageContainer}>
                  <img src={item.food.imageUrl} alt={item.food.name} />
                </div>

                <div className={classes.foodName}>
                  <Link to={`/food/${item.food.id}`}>{item.food.name}</Link>
                </div>

                <div className={classes.quantityContainer}>
                  <button
                    className={classes.quantityButton}
                    onClick={() =>
                      item.quantity > 1
                        ? changeQuantity(item, item.quantity - 1)
                        : removeFromCart(item.food.id)
                    }
                  >
                    -
                  </button>
                  <span className={classes.quantityValue}>{item.quantity}</span>
                  <button
                    className={classes.quantityButton}
                    onClick={() => changeQuantity(item, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <div className={classes.priceContainer}>
                  <Price price={item.food.price * item.quantity} />
                </div>

                <div className={classes.removeButtonContainer}>
                  <button
                    className={classes.remove_button}
                    onClick={() => removeFromCart(item.food.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className={classes.checkout}>
            <div className={classes.checkoutSummary}>
              <div className={classes.foods_count}>
                {cart.items.reduce((acc, item) => acc + item.quantity, 0)} items
              </div>
              <div className={classes.total_price}>
                <Price
                  price={cart.items.reduce(
                    (acc, item) => acc + item.food.price * item.quantity,
                    0
                  )}
                />
              </div>
            </div>
            <Link to="/checkout" className={classes.checkoutButton}>
              Proceed To Checkout
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
