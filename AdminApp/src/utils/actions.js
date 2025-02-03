// Action for Authentication
export async function loginAction({ request }) {
  // Get data form Signin/Signup form
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  // Data for Authen
  const loginInfor = { email, password };

  // Fetching to backend
  const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(loginInfor),
    credentials: "include",
  });

  const resData = await response.json();
  return resData;
}

// Action for add new product
export async function addNewProductAction({ request }) {
  // Get data form Signin/Signup form
  const formData = await request.formData();
  const name = formData.get("name");
  const category = formData.get("category");
  const price = formData.get("price");
  const short_desc = formData.get("short_desc");
  const long_desc = formData.get("long_desc");
  const files = formData.get("fileUpload");

  const productData = { name, category, price, short_desc, long_desc, files };

  // Fetching to backend
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/admin/add-product`,
    {
      method: "POST",
      headers: {
        "content-type": "multipart/form-data",
      },
      body: JSON.stringify(productData),
      credentials: "include",
    }
  );

  const resData = await response.json();
  return resData;
}
