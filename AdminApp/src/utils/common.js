import { json } from "react-router-dom";

// This funtion to paging the results
export function paginate(array, page_size, page_number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

// This function to check login status
export async function checkLogin() {
  const sessionData = await getActiveUserInfor();
  const isLoggedIn = sessionData.isLoggedIn;
  return isLoggedIn;
}

// This function to get role of user
export async function getUserRole() {
  const sessionData = await getActiveUserInfor();
  const role = sessionData.role;
  return role;
}

// Defines "getFetching" function is sharing to used for difference functions
export async function getFetching(urlString, messageString) {
  const response = await fetch(urlString, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw json({ status: 500, message: messageString });
  }

  const resData = await response.json();
  return resData;
}

// Defines "postFetching" function is sharing to used for difference functions
export async function postFetching(urlString, bodyData, messageString) {
  const response = await fetch(urlString, {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });

  if (!response.ok) {
    throw json({ status: 500, message: messageString });
  }

  const resData = await response.json();
  return resData;
}

// This function to get information of active user
export async function getActiveUserInfor() {
  const urlString = `${process.env.REACT_APP_API_URL}/admin/getActiveUserInfor`;

  const messageString =
    "Fetching for get information of active user was failed!";
  const resData = await getFetching(urlString, messageString);

  return resData;
}

// This function to get all users
export async function getAllUsers() {
  const urlString = `${process.env.REACT_APP_API_URL}/admin/get-users`;
  const messageString = "Get all users process is failed!";
  const resData = await getFetching(urlString, messageString);

  return resData;
}

// This function to get all products
export async function getAllProducts() {
  const urlString = `${process.env.REACT_APP_API_URL}/admin/get-products`;
  const messageString = "Get all products process is failed!";
  const resData = await getFetching(urlString, messageString);

  return resData;
}

// This function to get product by Id
export async function getProductById(productID) {
  const urlString = `${process.env.REACT_APP_API_URL}/admin/get-product-byId`;
  const messageString = "Get product by ID process is failed!";
  const bodyData = { productID };
  const resData = await postFetching(urlString, bodyData, messageString);

  return resData;
}

// This function to get all orders
export async function getAllOrders() {
  const urlString = `${process.env.REACT_APP_API_URL}/admin/get-orders`;
  const messageString = "Get all orders process is failed!";
  const resData = await getFetching(urlString, messageString);

  return resData;
}

// This function to get order by orderID
export async function getOrderById(orderID) {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/admin/get-order-by-id`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ orderID }),
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw json({
      status: 500,
      message: "Get order by orderID in admin process was failed!",
    });
  }

  const resData = await response.json();
  return resData;
}

// This function to format number to Viet Nam currency format
export function formatNumberToVietNamCurrency(number) {
  const vietnamCurrencyValue = `${new Intl.NumberFormat("vi-VN").format(
    number
  )} VND`;

  return vietnamCurrencyValue;
}

// This function to add new product
export async function postAddNewProduct(productData) {
  // Get data from "productData"
  const name = productData.name;
  const category = productData.category;
  const price = productData.price;
  const short_desc = productData.short_desc;
  const long_desc = productData.long_desc;
  const files = productData.images;
  const productInfor = { name, category, price, short_desc, long_desc };

  const formData = new FormData();

  // Add file upload to "formData"
  for (let i = 0; i < files.length; i++) {
    formData.append("fileUpload", files[i]);
  }

  // Add product information to "formData"
  formData.append("productInfor", JSON.stringify(productInfor));

  // Fetching to backend
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/admin/add-product`,
    {
      method: "POST",
      body: formData,
      credentials: "include",
    }
  );

  const resData = await response.json();
  return resData;
}

// This function to edit product
export async function postEditProduct(productData) {
  // Get data from "productData"
  const productID = productData.productID;
  const name = productData.name;
  const category = productData.category;
  const price = productData.price;
  const short_desc = productData.short_desc;
  const long_desc = productData.long_desc;
  const productInfor = {
    productID,
    name,
    category,
    price,
    short_desc,
    long_desc,
  };

  // Fetching to backend
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/admin/edit-product`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ productInfor }),
      credentials: "include",
    }
  );

  const resData = await response.json();
  return resData;
}

// This function to delete product by Id
export async function postDeleteProduct(productID) {
  const urlString = `${process.env.REACT_APP_API_URL}/admin/delete-product`;
  const messageString = "Delete product process is failed!";
  const bodyData = { productID };
  const resData = await postFetching(urlString, bodyData, messageString);

  return resData;
}
