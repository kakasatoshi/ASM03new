// OK
import Styles from "./MessengerPopup.module.css";
import React, { useRef, useState } from "react";

export default function MessengerPoup() {
  // Use hooks to store "isDisable" state and get value of message input
  const [isDisable, setIsDisable] = useState(true);
  const inputRef = useRef();

  // This function to handle onChange event of input message
  function onChangeHandler() {
    if (inputRef.current.value.trim() !== "") {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }

  return (
    <div className={`${Styles["messenger-container"]}`}>
      {/* Header of message frame */}
      <div
        className={`${Styles.header} d-flex justify-content-between align-items-center`}
      >
        <label>Customer Support</label>
        <span>Let's Chat App</span>
      </div>

      {/* Body of message frame */}
      <div className={Styles.body}>
        <div
          className={`${Styles.customer} d-flex flex-column align-items-end`}
        >
          <p>Xin chào</p>
          <p>Làm thế nào để xem được các sản phẩm</p>
        </div>
        <div className={`${Styles.admin}`}>
          <div className="d-flex align-items-center">
            <img src="./images/admin.png" alt="admin" />
            <p>ADMIN: Chào bạn</p>
          </div>
          <div className="d-flex align-items-center">
            <img src="./images/admin.png" alt="admin" />
            <p>ADMIN: Bạn có thể vào mục Shop để xem các sản phẩm</p>
          </div>
        </div>
      </div>

      {/* Footer of message frame */}
      <div
        className={`${Styles.footer} d-flex justify-content-start align-items-center`}
      >
        <img src="./images/admin.png" alt="admin" />
        <input
          type="text"
          ref={inputRef}
          onChange={onChangeHandler}
          placeholder="Enter Message!"
        />
        <div
          className={`${Styles["message-control"]} d-flex justify-content-around align-items-center`}
        >
          <i
            className={`${Styles["paper-clip"]} ${
              Styles[isDisable ? "disable" : "enable"]
            } fa fa-paperclip`}
            aria-hidden="true"
          />
          <i
            className={`${Styles["smile-icon"]} ${
              Styles[isDisable ? "disable" : "enable"]
            } bi bi-emoji-smile-fill`}
          />
          <i
            className={`${Styles["send-icon"]} ${
              Styles[isDisable ? "disable" : "enable"]
            } fa fa-paper-plane`}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
