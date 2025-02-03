// OK
import { redirect } from "react-router-dom";

// This action for Authentication (signup/signin)
export async function submitAuthenDataAction({ request }) {
  let bodyData, apiURL;
  const authenInfor = await request.json();
  const authMode = authenInfor.mode;

  // Redirect to other page after authentication
  switch (authMode) {
    case "signup":
      apiURL = `${process.env.REACT_APP_API_URL}/client/signup`;
      bodyData = authenInfor.newUser;
      break;
    case "login":
      apiURL = `${process.env.REACT_APP_API_URL}/client/login`;
      bodyData = authenInfor.loginInfor;
      break;
  }

  const response = await fetch(apiURL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(bodyData),
    credentials: "include",
  });

  const resData = await response.json();
  // const messageContent = resData.message;

  if (authMode === "signup") {
    if (resData.message === "Successful") return redirect("/login");
    return { message: resData.message };
  }

  if (authMode === "login") {
    return {
      message: resData.message,
      userID: resData.userID,
      userEmail: resData.userEmail,
      fullName: resData.fullName,
      lastName: resData.lastName,
      phone: resData.phone,
      isLoggedIn: resData.isLoggedIn,
    };
  }
}
