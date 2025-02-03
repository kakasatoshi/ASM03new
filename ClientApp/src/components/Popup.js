// OK
import React, { Fragment } from "react";
import classes from "./Popup.module.css";
import ReactDOM from "react-dom";
import { formatNumberToVietNamCurrency } from "../utils/common";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Defines "Backdrop" component for Popup
function Backdrop(props) {
  return <div className={classes.backdrop} onClick={props.onClose} />;
}

// Defines "ModalOverlay" component for Popup
function ModalOverlay(props) {
  return (
    <div className={`${classes.modal} d-grid`}>
      <button className={classes["close-btn"]} onClick={props.onClose}>
        x
      </button>
      <div>{props.children}</div>
    </div>
  );
}

// Defines "Popup" component
export default function Popup(props) {
  // Get current user from redux
  const isLoggedIn = useSelector(
    (state) => state.authSlice.currentUser.isLoggedIn
  );

  // Use "useNavigate()" hook to redirect to other page
  const navigate = useNavigate();

  // Get product data from "popupData" prop and assign to "productItem" variable
  const productItem = props.popupData;

  // Define "productDataElement" to display in "ModalOverlay" component
  const productDataElement = (
    <div
      className={`${classes["container-productInfor"]} d-flex flex-row align-items-center fst-italic`}
    >
      {/* Images of product */}
      <div className={`${classes["product-img"]}  col-6`}>
        <img src={productItem.img1} alt="product-img" />
      </div>

      {/* Information of product */}
      <div className={`${classes["product-infor"]} col-6`}>
        <div>
          <p>{productItem.name}</p>
          <span>
            <span>{formatNumberToVietNamCurrency(productItem.price)}</span>
          </span>
        </div>
        <div className={`${classes["short_desc"]}`}>
          {productItem["short_desc"]}
        </div>
        <div
          className={`${classes["view-detail-btn"]} d-flex justify-content-between align-items-center`}
        >
          <i className={`fa fa-shopping-cart ${classes.icon}`} />
          <button
            onClick={() => {
              onClickHandlerForViewDetail(productItem._id);
            }}
          >
            View Detail
          </button>
        </div>
      </div>
    </div>
  );

  // This function to handle onclick event of "View Detail" button
  function onClickHandlerForViewDetail(productID) {
    if (isLoggedIn) {
      // User is logged in: redirect to "Detail" page
      // Redirect to detail page for this product
      navigate("/detail/" + productID);

      // Close detail popup
      props.onClose();
    } else {
      // User is not logged in: warning for login
      alert("Login to get details!");
    }
  }

  return (
    <Fragment>
      {/* Using Portal for Backdrop component */}
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById("root")
      )}

      {/* Using Portal for ModalOvelay component */}
      {ReactDOM.createPortal(
        <ModalOverlay onClose={props.onClose}>
          {productDataElement}
        </ModalOverlay>,
        document.getElementById("root")
      )}
    </Fragment>
  );
}
