// OK
import { json, redirect } from "react-router-dom";
import { checkLogin } from "./common";

// This Loader to get product data from server (backend)
export async function getProductDataLoader() {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/client/get-products`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    // Fetching process is faile: throw a responsive (json) includes error information
    throw json(
      { message: "Fetching product data from database has failed!" },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}

// This Loader to get cart data from server (backend)
export async function getCartDataLoader() {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/client/get-carts`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    // Fetching process is faile: throw a responsive (json) includes error information
    throw json(
      { message: "Fetching cart data from database has failed!" },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}

// This Loader to combine "getProductDataLoader()" and "getCartDataLoader()"
export async function getProductAndCartDataLoader() {
  const [productList, cartList] = await Promise.all([
    getProductDataLoader(),
    getCartDataLoader(),
  ]);

  return { productList, cartList };
}

// This loader to get information of active user
export async function getCurrentUserInforLoader() {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/client/get-current-user`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw json({
      status: 500,
      message: "Get current user infor process was failed!",
    });
  }

  const resData = await response.json();
  return resData;
}

// This loader to check login and handle when user access to "Login" or "Signup" page
// by enter "/login" or "/register" url to address bar in browser
export async function checkLoginLoader() {
  const resData = await checkLogin();
  const isLoggedIn = resData.isLoggedIn;

  // If user has logged in then redirect to "Home" page
  if (isLoggedIn) {
    return redirect("/");
  }
  return null;
}

// This loader to check authentication (to protect private page)
export async function checkAuthLoader() {
  const resData = await checkLogin();
  const isLoggedIn = resData.isLoggedIn;

  // If user has not logged in then redirect to "Login" page
  return isLoggedIn ? null : redirect("/login");
}
