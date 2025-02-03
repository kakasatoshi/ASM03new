// OK
import Styles from "./ProductList.module.css";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { productActions } from "../store/redux";
import Popup from "./Popup";

// Defines "ProductList" component to share between "Home" page and "Shop" page
// Using for "Home" page: <ProductList parentComponent = "HomePage"/>
// Using for "Shop" page: <ProductList parentComponent = "ShopPage"/>
export default function ProductList({
  productData,
  productCategory = "all",
  parentComponent,
}) {
  // ==================================== USING HOOKS SECTION ================================================
  const navigate = useNavigate();
  const [category, setCategory] = useState();
  const isLoggedIn = useSelector(
    (state) => state.authSlice.currentUser.isLoggedIn
  );
  const isShowPopup = useSelector((state) => state.productSlice.isShowPopup);
  const productDataPopup = useSelector(
    (state) => state.productSlice.productFilterByID
  );
  const disPatch = useDispatch();

  // ================================== DECLARE VARIABLES SECTION ============================================
  // This variable to set column layout to display "ProductList" in "Home" page (4 columns) or "Shop" page (3 columns)
  const colLayout = parentComponent === "HomePage" ? "col-3" : "col-4";

  // Those variables below for product list and paging
  let productDataArr, // Array of product data get from database
    productList = [], // Product list (array of product item elements)
    productItemEL, // Product item element
    totalNum, // total quantity of the product (for paging)
    showingNum, // number of product is showing on the "Shop" page (for paging)
    pagingText; // text under pagination control (for paging)

  // ================================== HANDLE LOGIC CODE SECTION ===========================================
  // Using useEffect() hook to load corresponding product when user click on category
  useEffect(() => {
    setCategory(productCategory);
  }, [productCategory]);

  // When the user clicks on the category: show all of products or show products in the same category
  if (category === "all") {
    productDataArr = productData;
  } else {
    productDataArr = productData.filter((x) => x.category === category);
  }

  // Defines this function to handle event click on image
  function eventClickHandler(productID) {
    // Get product data by id, when user click to product image
    const dataPopup = productDataArr.find((x) => x._id === productID);

    // If on "Home" page then turn on popup, if on "Shop" page then redirect to "Detail" page
    if (parentComponent === "HomePage") {
      // Turn on popup to show product information (using for "Home" page)
      disPatch(productActions.SHOW_POPUP(dataPopup));
    } else {
      // Redirect to "Detail" page (using for "Shop" page)
      if (isLoggedIn) {
        // User is logged in: redirect to "Detail" page
        navigate("/detail/" + productID);
      } else {
        // User is not logged in: warning for login
        alert("Login to get details!");
      }
    }
  }

  // Define this function to turn off popup when users click on close button
  function turnOffPopupHandler() {
    disPatch(productActions.HIDE_POPUP());
  }

  // Get quantity total of items in product data list
  totalNum = productDataArr.length;

  // Loop throught "productDataArr" to create an array of product item elements to display the first 8 products
  for (let i = 0; i < totalNum; i++) {
    showingNum = i + 1;
    // if (i >= 8) break;
    productItemEL = (
      <figure className={colLayout} key={`${productCategory}-${i}`}>
        <img
          src={productDataArr[i].img1}
          alt="product-img"
          onClick={() => eventClickHandler(productDataArr[i]._id)}
        />
        <p>{productDataArr[i].name}</p>
        <span>
          {new Intl.NumberFormat("vi-VN").format(productDataArr[i].price)} VND
        </span>
      </figure>
    );
    productList.push(productItemEL);
  }

  // Defines a string to display text under the pagination control
  pagingText = `Showing ${
    totalNum > 0
      ? "1-" + showingNum + " of " + (totalNum + " results ")
      : "0 of 0 results"
  }`;

  return (
    <Fragment>
      {/* List of Products */}
      <div className={`${Styles["category-list"]} row`}>{productList}</div>

      {/* Paging */}
      {/* Display "Paging": using for "Shop" page */}
      {parentComponent === "ShopPage" && (
        <div className={`${Styles["paging-container"]}`}>
          <div
            className={`${Styles["paging-control"]} d-flex justify-content-end gap-1`}
          >
            <button>{`<<`}</button>
            {totalNum > 0 && <span>1</span>}
            <button>{`>>`}</button>
          </div>
          <div>{pagingText}</div>
        </div>
      )}

      {/* Popup */}
      {isShowPopup && (
        <Popup popupData={productDataPopup} onClose={turnOffPopupHandler} />
      )}
    </Fragment>
  );
}
