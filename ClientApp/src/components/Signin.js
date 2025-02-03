// OK
import {
  Form,
  Link,
  useActionData,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import Style from "./Signin.module.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/redux";
export default function Signin() {
  // Use hooks to control: error information state, update state in redux,
  // submit a request, get data returned from loader, input value
  const [errorInfor, setErrorInfor] = useState();
  const [loginStatus, setLoginStatus] = useState(false);
  const navigate = useNavigate();
  const disPatch = useDispatch();

  // Get response data returned by action
  const resData = useActionData();

  // const disPatch = useDispatch();
  const submit = useSubmit();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // This function to handle forcus event on input: clear error information for input validation
  function onFocusInputHanler() {
    setErrorInfor(null);
  }

  // This function to handle click event of "Sign In" button
  function submitSignInDataHandler(e) {
    e.preventDefault();

    let user; // This variable to store data of user whose has email address in the same email on input

    const emailInput = emailInputRef.current.value;
    const passwordInput = passwordInputRef.current.value;

    const userInfor = {
      email: emailInput,
      password: passwordInput,
    };

    // Submit the login request to backend
    submit(
      { mode: "login", loginInfor: userInfor },
      { method: "POST", encType: "application/json" }
    );
  }

  // This useEffect() hook to show message of error login return by server
  useEffect(() => {
    if (resData) {
      // Get information of current user
      const currentUser = {
        userID: resData.userID,
        userEmail: resData.userEmail,
        fullName: resData.fullName,
        lastName: resData.lastName,
        phone: resData.phone,
        isLoggedIn: resData.isLoggedIn,
      };

      if (resData.message === "Successful") {
        // Update login data to "authSlice" state in the redux
        disPatch(authActions.ON_LOGIN(currentUser));
        setLoginStatus(true);
      } else {
        // Update "errorInfor" state
        setErrorInfor(resData.message);
      }
    }
  }, [resData]);

  useEffect(() => {
    // If user has logged in then redirect to "Home" page
    if (loginStatus) {
      navigate("/");
    }
  }, [loginStatus]);

  return (
    <div className={`${Style["signin-container"]} `}>
      <p className={Style["signin-title"]}>Sign In</p>

      <Form className="d-flex flex-column pb-4 ps-5 pe-5">
        {/* Error information of validation input */}
        <span className={Style["error-infor"]}>{errorInfor}</span>

        {/* Input */}
        <input
          type="email"
          id="email"
          ref={emailInputRef}
          className={Style["no-border-bottom"]}
          placeholder="Email"
          onFocus={onFocusInputHanler}
        />
        <input
          type="password"
          id="password"
          ref={passwordInputRef}
          placeholder="Password"
          onFocus={onFocusInputHanler}
        />

        {/* Button */}
        <button
          className={Style["signin-btn"]}
          onClick={submitSignInDataHandler}
        >
          SIGN IN
        </button>
        <p className={Style["create-account"]}>
          Create an account? <Link to="/register">Sign Up</Link>
        </p>
      </Form>
    </div>
  );
}
