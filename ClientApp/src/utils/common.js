// OK

import { json } from "react-router-dom";

// ======================================= Tasks For Authen =================================================
// This function to get information of active user
export async function checkLogin() {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/client/checklogin`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw json({ status: 500, message: "Fetching process was failed!" });
  }

  const resData = await response.json();
  return resData;
}

// This function to get information of active user
export async function getCurrentUserInfor() {
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
      message: "Get current user infor in Layout was failed!",
    });
  }

  const resData = await response.json();
  return resData;
}

// ======================================= Tasks For Product ================================================
// This function to get product data from server (backend)
export async function getProductData() {
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

// // This function to add data in cart of current user (product and quantity)
export async function addCartOfCurrentUser(dataForCart) {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/client/add-cart`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(dataForCart),
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw json({ status: 500, message: "Add to cart process was failed!" });
  }

  const resData = await response.json();
  return resData;
}

// This function to update cart of current user
export async function updateCartOfCurrentUser(dataForCart) {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/client/update-cart`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(dataForCart),
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw json({ status: 500, message: "Add to cart process was failed!" });
  }

  const resData = await response.json();
  return resData;
}

// This function to delete an item in cart of current user
export async function deleteItemInCartOfCurrentUser(userID, productID) {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/client/delete-item-cart`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userID, productID }),
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw json({
      status: 500,
      message: "Delete item in cart process was failed!",
    });
  }

  const resData = await response.json();
  return resData;
}

// This function to get data in cart of current user (product and quantity)
export async function getCartOfCurrentUser(userID) {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/client/get-cart-user`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userID }),
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw json({
      status: 500,
      message: "Get cart of current user process was failed!",
    });
  }

  const resData = await response.json();
  return resData;
}

// This function to calculate total amount for cart of current user
export function getTotalAmountCartOfCurrentUser(cartOfCurrentUser) {
  // Calculate the total amount for cart of current user
  const totalAmountOfCart = cartOfCurrentUser.reduce((initValue, item) => {
    return initValue + item.productItem.price * item.quantity;
  }, 0);

  // Format total amount to Viet Nam currency format
  const totalValue = formatNumberToVietNamCurrency(totalAmountOfCart);
  return totalValue;
}

// This function to format number to Viet Nam currency format
export function formatNumberToVietNamCurrency(number) {
  const vietnamCurrencyValue = `${new Intl.NumberFormat("vi-VN").format(
    number
  )} VND`;

  return vietnamCurrencyValue;
}

// This function to create an order on model("order")
export async function createNewOrder(orderData) {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/client/create-order`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ orderData }),
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw json({
      status: 500,
      message: "Create new order process was failed!",
    });
  }

  const resData = await response.json();
  return resData;
}

// This function to update quantity for product after completed order
export async function updateQuantityOfProducts(productsInOrder) {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/client/update-quantity-product`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ productsInOrder }),
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw json({
      status: 500,
      message: "Update quantity of product process was failed!",
    });
  }

  const resData = await response.json();
  return resData;
}

// This function to delete cart of current user
export async function deleteCart(userID) {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/client/delete-cart`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userID }),
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw json({
      status: 500,
      message: "Delete cart process was failed!",
    });
  }

  const resData = await response.json();
  return resData;
}

// This function to logout client/logout
export async function logout() {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/client/logout`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw json({
      status: 500,
      message: "Logout process was failed!",
    });
  }

  const resData = await response.json();
  return resData;
}

// This function to get data in order of current user
export async function getOrderOfCurrentUser(userID) {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/client/get-order-user`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userID }),
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw json({
      status: 500,
      message: "Get order of current user process was failed!",
    });
  }

  const resData = await response.json();
  return resData;
}

// This function to get order by orderID
export async function getOrderById(orderID) {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/client/get-order-by-id`,
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
      message: "Get order by orderID in client process was failed!",
    });
  }

  const resData = await response.json();
  return resData;
}
