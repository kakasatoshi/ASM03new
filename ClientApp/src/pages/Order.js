// OK
import styles from "./Order.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  formatNumberToVietNamCurrency,
  getOrderOfCurrentUser,
} from "../utils/common";
import { Link } from "react-router-dom";
export default function Order() {
  // Define "orderOfUser" state to store order data of current user
  const [orderOfUser, setOrderOfUser] = useState(null);

  // Get "userID" from state in redux
  const userID = useSelector((state) => state.authSlice.currentUser.userID);

  // This function to get details of order
  async function getOrderDetailHandler(orderID) {}

  // This "useEffect()" hook to get order data of current user when load this page
  useEffect(() => {
    getOrderOfCurrentUser(userID).then((data) => {
      if (data) {
        setOrderOfUser(data);
      } else {
        setOrderOfUser("no-order");
      }
    });
  }, []);

  return (
    <div className="d-grid gap-3">
      {/* BANNER */}
      <section>
        <div
          className={`${styles.banner} d-flex justify-content-between align-items-center fst-italic mb-5`}
        >
          <h1>HISTORY</h1>
          <h5>HISTORY</h5>
        </div>
      </section>

      {/* PAGE TITLE */}
      <section>
        <p className={styles["page-title"]}>YOUR LIST OF ORDERS</p>
      </section>

      {/* ORDER LIST */}
      <section>
        {orderOfUser && orderOfUser !== "no-order" && (
          <div className={styles["order-list-container"]}>
            {/* Header */}
            <div className={`${styles["header"]} d-flex`}>
              <div className={`${styles["orderID"]}`}>ID ORDER</div>
              <div className={`${styles["userID"]}`}>ID USER</div>
              <div className={`${styles["name"]}`}>NAME</div>
              <div className={`${styles["phone"]}`}>PHONE</div>
              <div className={`${styles["address"]}`}>ADDRESS</div>
              <div className={`${styles["total"]}`}>TOTAL</div>
              <div className={`${styles["delivery"]}`}>DELIVERY</div>
              <div className={`${styles["status"]}`}>STATUS</div>
              <div className={`${styles["detail"]}`}>DETAIL</div>
            </div>

            {/* Body */}
            <div className={`${styles["container-content"]} borderss`}>
              {orderOfUser.map((item, index) => (
                /* <!-- Content --> */
                <div key={index} className={`${styles["content"]}  d-flex`}>
                  <div className={`${styles["orderID"]}`}>
                    {item._id.toString()}
                  </div>
                  <div className={`${styles["userID"]}`}>
                    {item.user.userID.toString()}
                  </div>
                  <div className={`${styles["name"]}`}>
                    {item.user.fullName.split(" ").at(-1)}
                  </div>
                  <div className={`${styles["phone"]}`}>{item.user.phone}</div>
                  <div className={`${styles["address"]}`}>
                    {item.user.address}
                  </div>
                  <div className={`${styles["total"]}`}>
                    {formatNumberToVietNamCurrency(item.totalAmount)}
                  </div>
                  <div className={`${styles["delivery"]}`}>
                    {item.status === "Completed"
                      ? "Completed"
                      : "Waiting for progressing"}
                  </div>
                  <div className={`${styles["status"]}`}>{item.status}</div>
                  <div className={`${styles["detail"]}`}>
                    <Link
                      className={styles["detail-btn"]}
                      to={"/order-detail"}
                      state={{ orderID: item._id }}
                    >
                      View &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* INFORMATION FOR NO DATA */}
      <section>
        {/* In case: User have not any order */}
        {orderOfUser === "no-order" && (
          <div className={`${styles["text-infor"]} ${styles["no-order"]} `}>
            You have not any order!
          </div>
        )}

        {/* In case: This page begin loading */}
        {!orderOfUser && (
          <div
            className={`${styles["text-infor"]} ${styles["begin-loading"]} `}
          >
            Your order list in here!
          </div>
        )}
      </section>
    </div>
  );
}
