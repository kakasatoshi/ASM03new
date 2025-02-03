import { redirect } from "react-router-dom";
import {
  checkLogin,
  getActiveUserInfor,
  getAllOrders,
  getAllProducts,
  getAllUsers,
  getProductById,
  getUserRole,
} from "./common";

// This loader to protect for routers
export async function protectRouterLoader() {
  const isLoggedIn = await checkLogin();
  if (!isLoggedIn) {
    window.location.href = "/admin/login";
    return true;
  } else {
    return false;
  }
}

// This loader to get information of active user
export async function getActiveUserInforLoader() {
  const userInfor = await getActiveUserInfor();
  return userInfor;
}

// This loader to handle for router("/admin/login"): If user is logged in then redirect to router("/")
export async function handlerForLoginRouter() {
  const isLoggedIn = await checkLogin();
  if (isLoggedIn) return redirect("/");

  return null;
}

// This loader for router("/products")
export async function loaderForDashBoard() {
  const [isLogout, users, orders] = await Promise.all([
    protectRouterLoader(),
    getAllUsers(),
    getAllOrders(),
  ]);

  if (isLogout) return null;

  return { users, orders };
}

// This loader for router("/products")
export async function loaderForProducts() {
  const [isLogout, role, productData] = await Promise.all([
    protectRouterLoader(),
    getUserRole(),
    getAllProducts(),
  ]);

  if (isLogout) return null;
  if (role !== "admin") return redirect("/");

  return productData;
}

// This loader for router("/products/:productId")
export async function loaderForProductById({ params }) {
  const productID = params.productID;
  const [isLogout, role, productData] = await Promise.all([
    protectRouterLoader(),
    getUserRole(),
    getProductById(productID),
  ]);

  if (isLogout) return null;
  if (role !== "admin") return redirect("/");

  return productData;
}
