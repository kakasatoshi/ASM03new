// OK
import Styles from "./Shop.module.css";
import ProductList from "../components/ProductList";
import { useEffect, useState } from "react";
import { getProductData } from "../utils/common";
export default function Shop() {
  // Use hooks to create "productList" and "category" state for this component
  const [productList, setProductList] = useState();
  const [category, setCategory] = useState("all");

  // This function to handle event click on category
  function eventClickHandler(e) {
    // Set category value to "category" state
    setCategory(e.currentTarget.innerHTML.toLowerCase());
  }

  // This "useEffect()" hook to get product data from database
  useEffect(() => {
    getProductData()
      .then((data) => {
        setProductList(data);
      })
      .catch((err) =>
        console.log("Error in get product data in Home page: ", err)
      );
  }, []);

  return (
    <div className="d-grid gap-3">
      {/* BANNER */}
      <section>
        <div
          className={`${Styles.banner} d-flex justify-content-between align-items-center fst-italic`}
        >
          <h1>SHOP</h1>
          <h5>SHOP</h5>
        </div>
      </section>

      {/* CONTENT */}
      <section>
        <div className={`${Styles["container-list"]} row fst-italic`}>
          {/* Category */}
          <div className={`${Styles.categories} col-3`}>
            <p>CATEGORIES</p>
            <div>
              <p className={Styles.apple}>APPLE</p>
              <span onClick={eventClickHandler}>All</span>
            </div>
            <div>
              <p className={Styles.title}>iPHONE & MAC</p>
              <span onClick={eventClickHandler}>iPhone</span>
              <span onClick={eventClickHandler}>iPad</span>
              <span onClick={eventClickHandler}>Macbook</span>
            </div>
            <div>
              <p className={Styles.title}>WIRELESS</p>
              <span onClick={eventClickHandler}>Airpod</span>
              <span onClick={eventClickHandler}>Watch</span>
            </div>
            <div>
              <p className={Styles.title}>OTHER</p>
              <span onClick={eventClickHandler}>Mouse</span>
              <span onClick={eventClickHandler}>Keyboard</span>
              <span onClick={eventClickHandler}>Other</span>
            </div>
          </div>

          {/* Product List */}
          <div className={`${Styles["product-list"]} col-9 pt-3`}>
            {/* Seaching and Sorting */}
            <div
              className={`${Styles["control-frame"]} d-flex justify-content-between align-items-center`}
            >
              {/* Input Search */}
              <input type="text" placeholder="Enter Search Here!" />

              {/* Sorting Dropdown List */}
              <div className="dropdown-list">
                <button
                  className={`${Styles["dropdown-list"]} d-flex justify-content-between align-items-center btn btn-outline-dark dropdown-toggle`}
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Default sorting
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Ascending sorting
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Descending sorting
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* List of products */}

            {productList && (
              <ProductList
                productData={productList}
                productCategory={category}
                parentComponent="ShopPage"
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
