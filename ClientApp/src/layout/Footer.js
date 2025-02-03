// OK
import Styles from "./Footer.module.css";
import { Link } from "react-router-dom";

export default function Footer() {
  // Layout to 3 columns, the links are dummy links (href="#")
  return (
    // <div className="container-fluid bg-dark text-white fst-italic">
    <div className="container-fluid text-white fst-italic">
      <div
        className={`${Styles["footer-container"]} d-flex gap-5 col-9 pt-5 pb-4`}
      >
        <div className="col-4">
          <span>CUSTOMER SERVICES</span>
          <ul>
            <li>
              <Link to="#">Help & Contact Us</Link>
            </li>
            <li>
              <Link to="#">Return and Refunds</Link>
            </li>
            <li>
              <Link to="#">Online Stores</Link>
            </li>
            <li>
              <Link to="#">Term & Conditions</Link>
            </li>
          </ul>
        </div>
        <div className="col-4">
          <span>COMPANY</span>
          <ul>
            <li>
              <Link to="#">What We Do</Link>
            </li>
            <li>
              <Link to="#">Available Services</Link>
            </li>
            <li>
              <Link to="#">Lastes Ports</Link>
            </li>
            <li>
              <Link to="#">FAQs</Link>
            </li>
          </ul>
        </div>
        <div className="col-4">
          <span>SOCIAL MEDIA</span>
          <ul>
            <li>
              <Link to="#">Twister</Link>
            </li>
            <li>
              <Link to="#">Instagram</Link>
            </li>
            <li>
              <Link to="#">Facebook</Link>
            </li>
            <li>
              <Link to="#">Pinterest</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
