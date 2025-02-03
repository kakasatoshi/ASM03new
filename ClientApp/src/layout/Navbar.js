// OK
import { useDispatch, useSelector } from "react-redux";
import Styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/redux";
import { logout } from "../utils/common";
import { useState } from "react";

export default function Navbar({ lastName }) {
  const [currentUser, setCurrentUser] = useState(lastName);
  // Use hooks to navigate and access to state of redux
  // const lastName = useSelector((state) => state.authSlice.currentUser);
  // const disPatch = useDispatch();
  const navigate = useNavigate();

  // This function to handler event click on button
  function navigationHandler(e) {
    const destination = e.currentTarget.innerHTML.toLowerCase();
    // If button is "Logout" then confirm to logout
    if (destination === "(logout)") {
      // Confirm to logout
      const confirm = window.confirm("Do you want to Logout?");
      if (confirm) {
        // // if user want to logout then delete current user data from localstorage and redux
        // localStorage.removeItem("lastName");
        // disPatch(authActions.ON_LOGOUT(null));

        // Call "logout" function to logout
        logout().then((result) => {
          setCurrentUser(null);
          // If user don't staying in "Shop" page then navigate to "Home" page
          const pathString = window.location.pathname;
          if (pathString !== "/shop") {
            navigate("/");
          }
        });
      }
    } else {
      // If user click to "Cart" button while...
      if (destination === "cart") {
        if (currentUser) {
          // user logged in already: navigate to "Cart" page
          navigate("/cart");
        } else {
          // user not yet logged in: Warning user to login
          alert('Login to go to "Cart" page');
          return;
        }
      }
      // If button is "Home", "Shop" then navigate to corresponding page
      destination === "home" ? navigate("/") : navigate(`/${destination}`);
    }
  }
  return (
    <nav
      className={`${Styles["navbar-container"]} row p-4 d-flex justify-content-between align-items-center fst-italic`}
    >
      <ul className="col-3 d-flex gap-4">
        <li>
          <button className={Styles.home} onClick={navigationHandler}>
            Home
          </button>
        </li>
        <li>
          <button onClick={navigationHandler}>Shop</button>
        </li>
        <li>
          <button onClick={navigationHandler}>Order</button>
        </li>
      </ul>
      <h5 className="col-4 d-flex justify-content-center">BOUTIQUE</h5>
      <ul className="col-3 d-flex justify-content-end align-items-center gap-4">
        <li className="d-flex">
          <i className={`fa fa-shopping-cart ${Styles.icon}`} />
          <button onClick={navigationHandler}>Cart</button>
        </li>
        <li className="d-flex">
          <i className={`fa fa-user ${Styles.icon}`} />
          {currentUser && (
            <label
              className={`${Styles["user-name"]} d-flex justify-content-between align-items-center gap-1`}
            >
              {currentUser}
              <i className="fa fa-caret-down" aria-hidden="true" />
            </label>
          )}
          <button className={Styles["logout-btn"]} onClick={navigationHandler}>
            {currentUser ? "(Logout)" : "Login"}
          </button>
        </li>
      </ul>
    </nav>
  );
}
