import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./UI/layout/Layout";
import ErrorPage from "./pages/errorpage/ErrorPage";
import Login from "./pages/login/Login";
import Product from "./pages/product/Product";
import { loginAction } from "./utils/actions";
import {
  getActiveUserInforLoader,
  handlerForLoginRouter,
  loaderForDashBoard,
  loaderForProductById,
  loaderForProducts,
} from "./utils/loaders";
import DashBoard from "./pages/dashboard/DashBoard";
import NewProduct from "./pages/product/NewProduct";
import EditProduct from "./pages/product/EditProduct";
import OrderDetail from "./pages/dashboard/OrderDetail";

const router = createBrowserRouter([
  {
    path: "/admin/login",
    element: <Login />,
    action: loginAction,
    loader: handlerForLoginRouter,
  },
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Layout />,
    loader: getActiveUserInforLoader,
    children: [
      {
        path: "",
        element: <DashBoard />,
        loader: loaderForDashBoard,
      },
      {
        path: "/order-detail",
        element: <OrderDetail />,
        loader: loaderForDashBoard,
      },
      {
        path: "products",
        element: <Product />,
        loader: loaderForProducts,
      },
      {
        path: "products/new-product",
        element: <NewProduct />,
        loader: loaderForProducts,
      },
      {
        path: "products/:productID",
        element: <EditProduct />,
        loader: loaderForProductById,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
