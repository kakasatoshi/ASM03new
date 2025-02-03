// OK
import Styles from "./CartList.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteItemInCartOfCurrentUser,
  formatNumberToVietNamCurrency,
  getTotalAmountCartOfCurrentUser,
  updateCartOfCurrentUser,
} from "../utils/common";

export default function CartList({ cartOfUser }) {
  const [cartOfCurrentUser, setCartOfCurrentUser] = useState(
    cartOfUser.cartData
  );
  const [totalAmount, setTotalAmount] = useState();

  // Get "userID" and "cartData" of current user
  const userID = cartOfUser.userID;

  // This variable to store total value of cart
  let totalValue;

  // This function to update cart of current user
  async function updateOrDeleteCartUserHandler(
    index,
    productID,
    count,
    adjustMethod
  ) {
    // Get value of input
    const inputEL = document.getElementById(index);
    let quantity = parseInt(inputEL.value);

    // Update value of input
    if (adjustMethod === "increment") {
      quantity = quantity + 1;
      if (quantity > count) {
        alert(
          `Quantity in stock of this product is ${count} products\nYou can not enter value great than ${count}`
        );
        inputEL.value = count;
      } else {
        inputEL.value = quantity;
      }
    } else if (adjustMethod === "decrement") {
      if (quantity > 1) {
        quantity = quantity - 1;
        inputEL.value = quantity;
      }
    } else {
      if (inputEL.value * 1 > count) {
        alert(
          `Quantity in stock of this product is ${count} products\nYou can not enter value great than ${count}`
        );
        inputEL.value = count;
        quantity = count;
      } else {
        inputEL.value =
          inputEL.value === "" || inputEL.value === "0" ? 1 : inputEL.value;
        quantity = inputEL.value * 1;
      }
    }

    // Define "dataForCart" variable to store information for cart updating
    const dataForCart = { userID, productID, quantity };
    try {
      if (adjustMethod !== "remove") {
        // Call this function to update cart for current user at model("cart") in database
        await updateCartOfCurrentUser(dataForCart);

        // Update value for "quantity" property of "cartOfCurrentUser" state
        cartOfCurrentUser[index].quantity = quantity;
      } else {
        // Call this function to delete item in cart of current user
        await deleteItemInCartOfCurrentUser(userID, productID);

        // Remove current item product in "cartOfCurrentUser"
        cartOfCurrentUser.splice(index, 1);
      }

      // Update "cartOfCurrentUser" state
      setCartOfCurrentUser([...cartOfCurrentUser]);

      // Calculate the total amount for cart of current user and update "totalAmount" state
      totalValue = getTotalAmountCartOfCurrentUser(cartOfCurrentUser);
      setTotalAmount(totalValue);
    } catch (error) {
      console.log("Error in update cart at Cart Page: ", error);
    }
  }

  // This "useEffect()" hook to get cart data of current user
  useEffect(() => {
    // Calculate the total amount for cart of current user and update "totalAmount" state
    totalValue = getTotalAmountCartOfCurrentUser(cartOfCurrentUser);
    setTotalAmount(totalValue);
  }, []);

  return (
    <div
      className={`${Styles["container-list"]} d-flex justify-content-between`}
    >
      {/* List Cart */}
      <div className={Styles["list-cart"]}>
        {/* Content */}
        <table>
          <thead>
            <tr>
              <th>IMAGE</th>
              <th>PRODUCT</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>TOTAL</th>
              <th>REMOVE</th>
            </tr>
          </thead>
          <tbody>
            {cartOfCurrentUser.length > 0 &&
              cartOfCurrentUser.map((item, index) => {
                return (
                  <tr key={item.productItem._id}>
                    <td>
                      <img src={item.productItem.img1} alt="product-image" />
                    </td>
                    <td className={Styles.name}>{item.productItem.name}</td>
                    <td className={Styles.price}>
                      {formatNumberToVietNamCurrency(item.productItem.price)}
                    </td>
                    <td className={Styles.quantity}>
                      <i
                        className={`${Styles["adjustment-btn"]} fa fa-caret-left fa-lg aria-hidden="true"`}
                        onClick={() =>
                          updateOrDeleteCartUserHandler(
                            index,
                            item.productItem._id,
                            item.productItem.count,
                            "decrement"
                          )
                        }
                      />
                      <input
                        type="number"
                        onChange={() => {
                          updateOrDeleteCartUserHandler(
                            index,
                            item.productItem._id,
                            item.productItem.count
                          );
                        }}
                        defaultValue={item.quantity}
                        id={index}
                        min={1}
                      />
                      <i
                        className={`${Styles["adjustment-btn"]} fa fa-caret-right fa-lg aria-hidden="true"`}
                        onClick={() =>
                          updateOrDeleteCartUserHandler(
                            index,
                            item.productItem._id,
                            item.productItem.count,
                            "increment"
                          )
                        }
                      />
                    </td>
                    <td className={Styles.total}>
                      {formatNumberToVietNamCurrency(
                        item.productItem.price * item.quantity
                      )}
                    </td>
                    <td className={Styles.remove}>
                      <i
                        className="fa fa-trash-o fa-lg"
                        aria-hidden="true"
                        onClick={() =>
                          updateOrDeleteCartUserHandler(
                            index,
                            item.productItem._id,
                            item.productItem.count,
                            "remove"
                          )
                        }
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {/* Footer */}
        <div
          className={`${Styles["footer-list"]} d-flex justify-content-between px-4 py-3`}
        >
          <div>
            <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
            <Link to="/shop">Continue shopping</Link>
          </div>
          <div>
            <Link to="/checkout">Proceed to checkout</Link>
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </div>
        </div>
      </div>

      {/* Cart Total */}
      <div className={`${Styles["cart-total"]}`}>
        <p>CART TOTAL</p>
        <div className="d-flex justify-content-between">
          <span className={Styles.title}>SUBTOTAL</span>
          <span className={Styles["subtotal-value"]}>{totalAmount}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span className={Styles.title}>TOTAL</span>
          <span className={Styles["total-value"]}>{totalAmount}</span>
        </div>
        <div className={Styles["total-control"]}>
          <input type="text" placeholder="Enter your coupon"></input>
          <button>
            <i className="fa fa-gift" aria-hidden="true"></i>
            Apply coupon
          </button>
        </div>
      </div>
    </div>
  );
}
