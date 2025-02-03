// OK
import Styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import ProductList from "./ProductList";
import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartOfCurrentUser, getProductData } from "../utils/common";

export default function ProductDetails({ productList, cartList }) {
  // Use "useSelector()" hook to get current user from redux
  const currentUser = useSelector((state) => state.authSlice.currentUser);
  // const cartList = useSelector((state) => state.cart.cartList);

  // Define "isDisable" state to enable/disable "Adding to cart" button
  const [isDisable, setIsDisable] = useState(true);

  // Create "productData" state to store data of products
  const [productData, setProductData] = useState(productList);

  // Use useRef() hook to get value of input
  const inputRef = useRef();

  // Use "useParams()" hook to get "productID" parameter from url of router
  const productID = useParams().productID;

  // Use "Dispatch()" hook to update data of redux
  const disPatch = useDispatch();

  // Find product item from "productData" array, which have same productID
  const productItem = productData.find((x) => x._id === productID);

  // The "relatedProduct" variable to store products in the same category
  let relatedProduct;

  // Filter products in the same category and assign to "relatedProduct" variable
  if (productItem) {
    relatedProduct = productData.filter(
      (x) => x.category === productItem.category && x._id !== productItem._id
    );
  }

  // This function to set true/false value to "isDisable" state
  function toggleDisable(inputValue) {
    if (inputValue > 0) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }

  // This function to increase order quantity
  function incrementHandler(quantity) {
    const inputValue = parseInt(inputRef.current.value);
    if (inputValue + 1 <= quantity) {
      inputRef.current.value = inputValue + 1;
    }
    toggleDisable(inputRef.current.value);
  }

  // This function to decrease order quantity
  function decrementHandler() {
    const inputValue = parseInt(inputRef.current.value);

    // Only decrease value of input by 1 while value of input great than 0 (inputValue > 0)
    if (inputValue > 0) {
      inputRef.current.value = inputValue - 1;
    }
    toggleDisable(inputRef.current.value);
  }

  // This function to handle "onChange" event on input
  function onChangeHandler(e, quantity) {
    let inputValue = e.target.value * 1;

    // Prevent user enter value great than quantity of product in stock
    if (inputValue > quantity) {
      e.target.value = quantity;
      return;
    }

    // If value of "inputValue" not a number then set "inputValue" to zero
    inputValue = inputValue === "" ? 0 : inputValue;
    inputRef.current.value = parseInt(inputValue);
    toggleDisable(inputRef.current.value);
  }

  // This function to handle click event on "Add to cart" button
  function addToCartHandler() {
    if (inputRef.current.value > 0) {
      const userID = currentUser.userID;
      const quantity = parseInt(inputRef.current.value);
      const indexUser = cartList.findIndex((x) => x.userID === userID);
      let indexProduct = -1;

      if (indexUser !== -1) {
        indexProduct = cartList[indexUser].cartData.findIndex(
          (x) => x.productID === productID
        );
      }

      // Create "dataForCart" object to update "cart" state in redux
      const dataForCart = {
        userID,
        productID,
        quantity,
      };

      // Call "addCart()" function to add to cart
      addCartOfCurrentUser(dataForCart);

      alert("Add to cart is successful!");

      // Reset value of cart input and set "isDisable" state to "true"
      inputRef.current.value = 0;
      setIsDisable(true);
    }
  }

  // This "useEffect()" hook to get data of product from database
  useEffect(() => {
    getProductData()
      .then((data) => setProductData(data))
      .catch((err) =>
        console.log("Error in get product data in useEffect: ", err)
      );
  }, []);

  return (
    <Fragment>
      {/* Found product by ID: Show details product information */}
      {productItem && (
        <div className={Styles["page-content"]}>
          {/* Product information */}
          <section>
            <div className={`${Styles["detail-container"]} row`}>
              {/* Images */}
              <figure className="row col-6">
                <div className={`${Styles["small-img"]} col-3`}>
                  <img src={productItem.img1} alt="product-photo" />
                  <img src={productItem.img2} alt="product-photo" />
                  <img src={productItem.img3} alt="product-photo" />
                  <img src={productItem.img4} alt="product-photo" />
                </div>
                <div className="col-9">
                  <img src={productItem.img4} alt="product-photo" />
                </div>
              </figure>

              {/* Information */}
              <div className={`${Styles["product-infor"]} col-6`}>
                <p className={Styles["product-name"]}>{productItem.name}</p>
                <span className={Styles["product-price"]}>
                  {new Intl.NumberFormat("vi-VN").format(productItem.price)} VND
                </span>
                <p className={Styles["short-desc"]}>
                  {productItem["short_desc"]}
                </p>
                <span className={Styles.category}>
                  CATEGORY: <span>{productItem.category}</span>
                </span>

                <span className={Styles["rest-quantity"]}>
                  Quantity in stock: <span>{productItem.count}</span>
                </span>

                {/* Add to cart control */}
                {productItem?.count > 0 && (
                  <div className={`${Styles["cart-control"]} d-flex`}>
                    <div className={`${Styles["container-cart"]} d-flex gap-3`}>
                      <span>QUANTITY</span>
                      <div
                        className={`${Styles["adjustment-container"]} d-flex align-items-centerss`}
                      >
                        <i
                          className={`${Styles["adjustment-btn"]} fa fa-caret-left fa-lg aria-hidden="true"`}
                          onClick={decrementHandler}
                        />
                        <input
                          type="number"
                          onChange={(e) => {
                            onChangeHandler(e, productItem?.count);
                          }}
                          ref={inputRef}
                          defaultValue={0}
                        />
                        <i
                          className={`${Styles["adjustment-btn"]} fa fa-caret-right fa-lg aria-hidden="true"`}
                          onClick={() => {
                            incrementHandler(productItem?.count);
                          }}
                        />
                      </div>
                    </div>
                    <button
                      className={Styles[isDisable ? "disable" : "cart-btn"]}
                      disabled={isDisable}
                      onClick={addToCartHandler}
                    >
                      Add to cart
                    </button>
                  </div>
                )}

                {/* Show out of stock information */}
                {productItem?.count === 0 && (
                  <p className={Styles["out-of-stock"]}>
                    <span>Status: </span>Out of Stock
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Description */}
          <section>
            <div className={Styles["description-container"]}>
              <p>DESCRIPTION</p>
              <h5>PRODUCT DESCRIPTION</h5>
              <div>
                {/* <span>ĐẶC ĐIỂM NỔI BẬT</span> */}
                <span className={Styles["long-desc"]}>
                  {productItem["long_desc"]}
                </span>
              </div>
            </div>
          </section>

          {/* Related product */}
          <section>
            <div className={Styles["related-product-container"]}>
              <h5>RELATED PRODUCTS</h5>
              <div className={Styles["related-product-img"]}>
                {relatedProduct.length > 0 ? (
                  <ProductList productData={relatedProduct} />
                ) : (
                  <div className={Styles["no-related-product"]}>
                    No related product
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Not found product by ID: Show error information */}
      {!productItem && (
        <p className={Styles["error-infor"]}>Not found details of product!</p>
      )}
    </Fragment>
  );
}
