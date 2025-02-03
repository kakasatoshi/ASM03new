// OK
import Styles from "./Layout.module.css";
import {
  Outlet,
  useLoaderData,
  useLocation,
  useRouteLoaderData,
} from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { authActions, cartActions } from "../store/redux";
import { useEffect, useState } from "react";
import MessengerPopup from "../components/MessengerPopup";

export default function Layout() {
  // Use "useDispatch()" to update data in redux
  const disPatch = useDispatch();

  // // Use "use"
  // const location = useLocation();
  // const [currentURL, setCurrentURL] = useState(location.pathname);

  // useEffect(() => {
  //   alert(location.pathname);
  //   setCurrentURL(location.pathname);
  // }, [location.pathname]);

  // Get response data return by "getCurrentUserInforLoader"
  const resData = useLoaderData();
  const { cartData } = useRouteLoaderData("GetProductAndCart");

  // // When "Layout" page load: Get data of "currentUser" and "listCart" from localstorage and update state in redux
  // const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  // const listCart = JSON.parse(localStorage.getItem("listCart")) ?? [];
  disPatch(authActions.ON_LOGIN(resData));
  // ====================================================================================
  console.log("============== Layout is running ===============");
  console.log("======== Cart Data =========: ", cartData);
  // ====================================================================================
  disPatch(cartActions.LOAD_CART(cartData));

  // use "useState()" hook to create a "isShowPopup" state
  const [isShowPopup, setIsShowPopup] = useState(false);

  // This function to toggle MessengerPopup (show/hide)
  function toggleMessengerPopupHandler() {
    setIsShowPopup((prev) => !prev);
  }

  return (
    <div>
      {/* Messenger frame */}
      <div>
        {/* Messenger button */}
        <i
          className={`${Styles["messenger-btn"]} bi bi-messenger`}
          onClick={toggleMessengerPopupHandler}
        />

        {/* Messenger Popup */}
        {isShowPopup && <MessengerPopup />}
      </div>

      {/* Layout-Content */}
      <div className="container-fluid col-9">
        <Navbar lastName={resData.lastName} />
        <main className={Styles["page-content"]}>
          <Outlet />
        </main>
      </div>
      <div className={Styles.footer}>
        <Footer />
      </div>
    </div>
  );
}
