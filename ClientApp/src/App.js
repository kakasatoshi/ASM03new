// OK
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Detail from "./pages/Detail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./layout/Layout";
import ErrorPage from "./components/ErrorPage";
import {
  checkAuthLoader,
  checkLoginLoader,
  getCurrentUserInforLoader,
  getProductAndCartDataLoader,
} from "./utils/loaders";
import { submitAuthenDataAction } from "./utils/actions";
import Order from "./pages/Order";
import OrderDetail from "./pages/OrderDetail";

function App() {
  // Define routers for App project:
  // - "Home" and "Shop" page: freely accessible (not requires login)
  // - "Cart", "Detail" and "Checkout" page: user must login to access (requires login)
  // - "Register" and "Login" page: accessable(not yet logged in) / not accessable(logged in already)
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      loader: getProductAndCartDataLoader,
      id: "GetProductAndCart",
      children: [
        {
          path: "",
          loader: getCurrentUserInforLoader,
          element: <Layout />,
          children: [
            { index: true, element: <Home /> },
            { path: "shop", element: <Shop /> },
            {
              path: "detail/:productID",
              loader: checkAuthLoader,
              element: <Detail />,
            },
            { path: "cart", loader: checkAuthLoader, element: <Cart /> },
            {
              path: "checkout",
              loader: checkAuthLoader,
              element: <Checkout />,
            },
            {
              path: "order",
              loader: checkAuthLoader,
              element: <Order />,
            },
            {
              path: "order-detail",
              loader: checkAuthLoader,
              element: <OrderDetail />,
            },
          ],
        },
        {
          path: "",
          loader: checkLoginLoader,
          id: "getUserData",
          children: [
            {
              path: "register",
              action: submitAuthenDataAction,
              element: <Register />,
            },
            {
              path: "login",
              action: submitAuthenDataAction,
              element: <Login />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
export default App;
