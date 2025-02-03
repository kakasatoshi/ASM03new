// OK
import ProductDetails from "../components/ProductDetails";
import { useRouteLoaderData } from "react-router-dom";

export default function Detail() {
  // Gets the product data returned from the Loader
  const { productList, cartList } = useRouteLoaderData("GetProductAndCart");

  return (
    <div className="fst-italic">
      <ProductDetails productList={productList} cartList={cartList} />
    </div>
  );
}
