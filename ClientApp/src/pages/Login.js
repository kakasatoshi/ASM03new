// OK
import Signin from "../components/Signin";
import Styles from "./Login.module.css";
export default function Login() {
  return (
    <div className={Styles["login-container"]}>
      <Signin />
    </div>
  );
}
