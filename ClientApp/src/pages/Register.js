// OK
import Styles from "./Register.module.css";
import Signup from "../components/Signup";

export default function Register() {
  return (
    <div className={Styles["register-container"]}>
      <Signup />
    </div>
  );
}
