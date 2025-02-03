// OK
import { Form, Link, useActionData, useSubmit } from "react-router-dom";
import Style from "./Signup.module.css";
import { useEffect, useRef, useState } from "react";
export default function Signup() {
  // Use hooks to control...
  // Error information state
  const [errorInfor, setErrorInfor] = useState();

  // Get response data returned by action
  const resMessage = useActionData();

  // Input value
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const phoneInputRef = useRef();

  // use "useSubmit()" hook to submit a request
  const submit = useSubmit();

  // This function to handle forcus event on input: clear error information for input validation
  function onFocusInputHanler() {
    setErrorInfor(null);
  }

  // This function to handle click event of "Sign Up" button
  function submitSignUpDataHandler(e) {
    e.preventDefault();

    // Get Full name as format: "FirstName MiddleName LastName"
    const nameInput = nameInputRef.current.value.trim().replace(/\s+/g, " ");
    const emailInput = emailInputRef.current.value;
    const passwordInput = passwordInputRef.current.value;
    const phoneInput = phoneInputRef.current.value.replace(/\s/g, "");

    // If pass all of validation checking then create a "newUser" object
    const userData = {
      fullName: nameInput,
      email: emailInput,
      password: passwordInput,
      phone: phoneInput,
    };

    // Submit the resgister request to backend
    submit(
      { mode: "signup", newUser: userData },
      { method: "POST", encType: "application/json" }
    );
  }

  // This useEffect() hook to show message of error signup return by server
  useEffect(() => {
    setErrorInfor(resMessage?.message);
  }, [resMessage]);

  return (
    <div className={`${Style["signup-container"]}`}>
      <p className={Style["signup-title"]}>Sign Up</p>
      <Form className="d-flex flex-column pt-3 pb-2 ps-5 pe-5">
        {/* Error information of validation input */}
        <span className={Style["error-infor"]}>{errorInfor}</span>

        {/* Input */}
        <input
          type="text"
          id="name"
          name="name"
          ref={nameInputRef}
          className={Style["no-border-bottom"]}
          placeholder="Full Name"
          onFocus={onFocusInputHanler}
        />
        <input
          type="email"
          id="email"
          name="email"
          ref={emailInputRef}
          className={Style["no-border-bottom"]}
          placeholder="Email"
          onFocus={onFocusInputHanler}
        />
        <input
          type="password"
          id="password"
          name="password"
          ref={passwordInputRef}
          className={Style["no-border-bottom"]}
          placeholder="Password"
          onFocus={onFocusInputHanler}
        />
        <input
          type="tel"
          id="phone"
          name="phone"
          ref={phoneInputRef}
          placeholder="Phone"
          onFocus={onFocusInputHanler}
        />

        {/* Button */}
        <button
          className={Style["signup-btn"]}
          onClick={submitSignUpDataHandler}
        >
          SIGN UP
        </button>
      </Form>
      <p className={Style.login}>
        Login? <Link to="/login">Click</Link>
      </p>
    </div>
  );
}
