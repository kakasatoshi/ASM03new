// OK
import { NavLink, useNavigate } from "react-router-dom";
import Styles from "./Checkout.module.css";
import { useSelector } from "react-redux";
import {
  checkLogin,
  createNewOrder,
  deleteCart,
  formatNumberToVietNamCurrency,
  getCartOfCurrentUser,
  getTotalAmountCartOfCurrentUser,
  updateQuantityOfProducts,
} from "../utils/common";
import { useEffect, useRef, useState } from "react";
export default function Checkout() {
  // Use "useRef()" hook to create ref for input
  const fullNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();

  // Use "useState()" hook to define some states for this component
  const [cartOfCurrentUser, setCartOfCurrentUser] = useState([]);
  const [totalAmount, setTotalAmount] = useState("unknow");
  const [isSuccess, setIsSuccess] = useState(false);

  // User some hooks to get data
  const currentUser = useSelector((state) => state.authSlice.currentUser);
  const userID = currentUser.userID;

  let cartData, totalValue, listContent;
  // if (cartList.length > 0) {
  //   cartData = cartList.find((x) => x.userID === userID).cartData;

  // Create the list content for cart of current user
  listContent = cartOfCurrentUser.map((item) => {
    return (
      <div
        key={item.productItem._id}
        className={`${Styles["item-list"]} d-flex justify-content-between`}
      >
        <label className={Styles["product-name"]}>
          {item.productItem.name}
        </label>
        <span
          className={Styles["product-price"]}
        >{`${formatNumberToVietNamCurrency(item.productItem.price)} x ${
          item.quantity
        }`}</span>
      </div>
    );
  });
  // }
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();

  // This function to create an order and save to database
  async function createOrderHandler() {
    // Get list of product in cart of current user
    const productArr = cartOfCurrentUser.map((item) => {
      return {
        productId: item.productItem._id,
        quantity: item.quantity,
      };
    });

    const fullName = fullNameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    const address = addressRef.current.value;

    // Define "emailConent" variable to store content of email
    const emailContent = `<div style="font-family: Arial, sans-serif; color: #fff; background-color: #202020; padding: 20px;">
        <div style="color: #fff">
          <h2>Xin Chào ${fullName}</h2>
          <p>
            <b>Phone:</b> ${phone}
          </p>
          <p>
            <b>Address:</b> ${address}
          </p>
        </div>
        <table style="width: 100%; margin-top: 20px; color: #fff;">
          <thead>
            <tr>
              <th style="border: 1px solid #fff; padding: 8px;">
                Tên Sản Phẩm
              </th>
              <th style="border: 1px solid #fff; padding: 8px;">Hình Ảnh</th>
              <th style="border: 1px solid #fff; padding: 8px;">Giá</th>
              <th style="border: 1px solid #fff; padding: 8px;">Số Lượng</th>
              <th style="border: 1px solid #fff; padding: 8px;">Thành Tiền</th>
            </tr>
          </thead>
          <tbody>
            ${cartOfCurrentUser
              .map(
                (item) =>
                  `<tr style="text-align: center">
                    <td style="border: 1px solid #fff; padding: 8px;">
                      ${item.productItem.name}
                    </td>
                    <td style="border: 1px solid #fff; padding: 8px; text-align: center;">
                      <img
                        src=${item.productItem.img1}
                        alt=${item.productItem.category}
                        style="width: 100px; height: auto;"
                      />
                    </td>
                    <td style="border: 1px solid #fff; padding: 8px;">
                      ${formatNumberToVietNamCurrency(item.productItem.price)}
                    </td>
                    <td style="border: 1px solid #fff; padding: 8px;">
                      ${item.quantity}
                    </td>
                    <td style="border: 1px solid #fff; padding: 8px;">
                      ${formatNumberToVietNamCurrency(
                        item.quantity * item.productItem.price
                      )}
                    </td>
                </tr>`
              )
              .join("")}
          </tbody>
        </table>
        <div style="color: #fff; font-size: 15px; font-weight: bold">
          <p style="margin-top: 20px; font-size: 1.2em;">
            <b>Tổng Thanh Toán:</b> ${totalAmount}
          </p>
          <p>Cảm ơn bạn!</p>
        </div>
      </div>`;

    // Define "orderData" object
    const orderData = {
      orderInfor: {
        user: { userID, fullName, email, phone, address },
        products: productArr,
        totalAmount: totalAmount.replace(/\D+/g, "") * 1, // Remove any non-numeric characters in "totalValue" (includes "." and "VND": 226.228.229 VND)
      },
      emailContent: emailContent,
    };

    try {
      //  Check expired for login session of current user
      const resData = await checkLogin();
      const isLoggedIn = resData.isLoggedIn;
      if (isLoggedIn) {
        // Call "createNewOrder()" function to create an order and save to "order" model
        await createNewOrder(orderData);

        // Call "updateQuantityOfProduct" function to update rest of quantity ("count") of "products" after completed order
        await updateQuantityOfProducts(productArr);

        // Call "deleteCart()" function to delete cart of currrent user after create new order is successful
        await deleteCart(userID);

        // Set value of "isSuccess" state to "true" to show successful information on this page
        setIsSuccess(true);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log("Error in create new order: ", error);
    }
  }

  // This function to set disable status for button
  function setDisableForButton() {
    const fullName = fullNameRef.current.value;
    const email = emailRef.current.value;
    const phoneNumber = phoneRef.current.value;
    const address = addressRef.current.value;

    const disable =
      fullName === "" || email === "" || phoneNumber === "" || address === "";

    setIsDisabled(disable);
  }

  // This "userEffect()" hook to load information of current user to inputs
  useEffect(() => {
    // Get data in cart of current user (product and quantity)
    getCartOfCurrentUser(userID)
      .then((data) => {
        if (data) {
          setCartOfCurrentUser(data.cartData);

          // Calculate the total amount for cart of current user
          totalValue = getTotalAmountCartOfCurrentUser(data.cartData);

          // Update "totalAmount" state
          setTotalAmount(totalValue);

          // Load information of current user to checkout form
          fullNameRef.current.value = currentUser.fullName;
          emailRef.current.value = currentUser.userEmail;
          phoneRef.current.value = currentUser.phone;
        } else setTotalAmount(0);
      })
      .catch((err) => {
        console.log("Error in get cart of current user: ", err);
      });
  }, []);

  return (
    <div>
      {/* BANNER */}
      <section>
        <div
          className={`${Styles.banner} d-flex justify-content-between align-items-center fst-italic`}
        >
          <h1>CHECKOUT</h1>

          {/* Sub navbar */}
          <nav className={Styles["sub-nav"]}>
            <NavLink
              className={({ isActive }) =>
                isActive ? Styles.active : undefined
              }
              to="/"
            >
              HOME
            </NavLink>
            <span>/</span>
            <NavLink
              className={({ isActive }) =>
                isActive ? Styles.active : undefined
              }
              to="/cart"
            >
              CART
            </NavLink>
            <span>/</span>
            <NavLink
              className={({ isActive }) =>
                isActive ? Styles.active : undefined
              }
              to="/checkout"
            >
              CHECKOUT
            </NavLink>
          </nav>
        </div>
      </section>

      {/* CONTENT */}
      <section>
        <div className={`${Styles.content} fst-italic`}>
          {/* Title */}
          <h4>BILLING DETAILS</h4>

          {/* Main content */}
          {totalAmount !== "unknow" && totalAmount !== 0 && (
            <div
              className={`${Styles["container-content"]} d-flex justify-content-between`}
            >
              {/* User information */}
              {!isSuccess && (
                <div className={`${Styles["user-infor"]} d-flex flex-column`}>
                  <label>FULL NAME:</label>
                  <input
                    type="text"
                    placeholder="Enter Your Full Name Here!"
                    ref={fullNameRef}
                    onKeyUp={setDisableForButton}
                  />
                  <label>EMAIL:</label>
                  <input
                    type="email"
                    placeholder="Enter Your Email Here!"
                    ref={emailRef}
                    onKeyUp={setDisableForButton}
                  />
                  <label>PHONE NUMBER:</label>
                  <input
                    type="text"
                    placeholder="Enter Your Phone Number Here!"
                    ref={phoneRef}
                    onKeyUp={setDisableForButton}
                  />
                  <label>ADDRESS:</label>
                  <input
                    type="text"
                    placeholder="Enter Your Address Here!"
                    ref={addressRef}
                    onKeyUp={setDisableForButton}
                  />

                  {/* "Place Order" button in disable mode */}
                  {isDisabled && (
                    <span className={`${Styles["disable-mode"]}`}>
                      Place order
                    </span>
                  )}

                  {/* "Place Order" button in enable mode */}
                  {!isDisabled && (
                    <button
                      className={`${Styles["place-order-btn"]} ${Styles["enable-mode"]}`}
                      onClick={createOrderHandler}
                    >
                      Place order
                    </button>
                  )}
                </div>
              )}

              {/* Notification of successful order to the user */}
              {isSuccess && (
                <p className={Styles["order-success"]}>
                  Your order has been placed successfully!
                </p>
              )}

              {/* Bill information */}
              <div className={`${Styles["bill-infor"]}`}>
                <p>YOUR ORDER</p>
                <div>{listContent}</div>
                <div
                  className={`${Styles["total-result"]} d-flex justify-content-between align-items-center`}
                >
                  <label>TOTAL</label>
                  <span>{totalAmount}</span>
                </div>
              </div>
            </div>
          )}

          {/* Notification of no any product in cart to order */}
          {totalAmount === 0 && (
            <p className={Styles["no-cart"]}>
              Your cart have not any products to order, recheck please!
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
