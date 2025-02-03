// OK
import { useSelector } from "react-redux";
import Styles from "./Cart.module.css";
import CartList from "../components/CartList";
import { useEffect, useState } from "react";
import { getCartOfCurrentUser } from "../utils/common";
export default function Cart() {
  // Define "cartOfUser" state to store cart data of current user
  const [cartOfUser, setCartOfUser] = useState();

  // Get "userID" from state in redux
  const userID = useSelector((state) => state.authSlice.currentUser.userID);

  // This "useEffect()" hook to get product data and cart data when load this page
  useEffect(() => {
    getCartOfCurrentUser(userID).then((data) => {
      if (data) {
        setCartOfUser(data);
      } else {
        setCartOfUser("no-data");
      }
    });
  }, []);

  return (
    <div className="d-grid gap-3">
      {/* BANNER */}
      <section>
        <div
          className={`${Styles.banner} d-flex justify-content-between align-items-center fst-italic mb-5`}
        >
          <h1>CART</h1>
          <h5>CART</h5>
        </div>
      </section>

      {/* CONTENT */}
      <section>
        <div className={`${Styles.content} fst-italic`}>
          {/* Title */}
          <h4>SHOPPING CART</h4>

          {/* List cart */}
          {cartOfUser && cartOfUser !== "no-data" && (
            <div className="d-flex justify-content-between">
              <div className={`${Styles["list-cart"]}`}>
                <CartList cartOfUser={cartOfUser} />
              </div>
            </div>
          )}

          {/* If current user has not data in cart then show information */}
          {cartOfUser && cartOfUser === "no-data" && (
            <p className={Styles["no-cart"]}>You have not data in your cart!</p>
          )}

          {/* Show information when this page is loading */}
          {!cartOfUser && (
            <p className={Styles["text-infor"]}>Your list cart in here!</p>
          )}
        </div>
      </section>
    </div>
  );
}
