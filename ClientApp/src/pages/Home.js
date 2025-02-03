// OK
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import Styles from "./Home.module.css";
import ProductList from "../components/ProductList";
import { useEffect, useState } from "react";
import { getProductData } from "../utils/common";

export default function Home() {
  // Use hooks to create state and navigate for this component
  const [productList, setProductList] = useState();
  const navigate = useNavigate();

  // Define this function to navigate to "Shop" page when users click on image in "PRODUCT CATEGORIES"
  function navigationHandler() {
    navigate("shop");
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
    <div className={`${Styles["homepage-content"]} d-grid gap-5 fst-italic`}>
      {/* BANNER */}
      <section>
        <div
          className={Styles.banner}
          style={{ backgroundImage: "url('/pictures/banner1.jpg')" }}
        >
          <p className={Styles.inspiration}>NEW INSPIRATION 2020</p>
          <p className={Styles["sale-off"]}>20% OFF ON NEW SEASON</p>
          <button onClick={navigationHandler}>Browse collections</button>
        </div>
      </section>

      {/* PRODUCT CATEGORIES */}
      <section className={Styles["product-category"]}>
        <div className={`${Styles["category-title"]}`}>
          <span>CAREFULLY CREATED COLLECTIONS</span>
          <p>BROWSE OUR CATEGORIES</p>
        </div>
        <div className="row">
          <figure className="col-6">
            <img
              src="/pictures/product_1.png"
              onClick={navigationHandler}
              alt="product-img"
            />
          </figure>
          <figure className="col-6">
            <img
              src="/pictures/product_2.png"
              onClick={navigationHandler}
              alt="product-img"
            />
          </figure>
        </div>
        <div className="row">
          <figure className="col-4">
            <img
              src="/pictures/product_3.png"
              onClick={navigationHandler}
              alt="product-img"
            />
          </figure>
          <figure className="col-4">
            <img
              src="/pictures/product_4.png"
              onClick={navigationHandler}
              alt="product-img"
            />
          </figure>
          <figure className="col-4">
            <img
              src="/pictures/product_5.png"
              onClick={navigationHandler}
              alt="product-img"
            />
          </figure>
        </div>
      </section>

      {/* PRODUCT LIST */}
      <section>
        <div className={Styles["title-product-list"]}>
          <span>MADE THE HARD WAY</span>
          <p>TOP TRANDING PRODUCTS</p>
        </div>

        {productList && (
          <div className={`${Styles["product-list"]} row`}>
            <ProductList
              productData={productList}
              parentComponent={"HomePage"}
            />
          </div>
        )}
      </section>

      {/* MORE INFORMATION */}
      <section>
        <div className={`${Styles["more-information"]}`}>
          <div className="row p-5">
            <div className="col-4">
              <p>FREE SHIPPING</p>
              <span>Free shipping worldwide</span>
            </div>
            <div className="col-4">
              <p>24 x 7 SERVICE</p>
              <span>Free shipping worldwide</span>
            </div>
            <div className="col-4">
              <p>FESTIVAL OFFER</p>
              <span>Free shipping worldwide</span>
            </div>
          </div>
        </div>
        <div
          className={`${Styles.subcribe} d-flex justify-content-between my-5 p-0`}
        >
          <div className={`${Styles["be-friends"]}`}>
            <p>LET'S BE FRIENDS!</p>
            <span>Nisi nisi tempor consequat laboris nisi.</span>
          </div>
          <div className="d-flex">
            <input type="text" placeholder="Enter your email address" />
            <button>Subcribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}
