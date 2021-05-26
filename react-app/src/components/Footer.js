import React from "react";
import { Link } from "react-router-dom";
import "./CSS/Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="bio-container">
        <section>
          <ul className="icons">
            <li>
              <Link to="/">
                <i class="fab fa-github"></i>
              </Link>
              Franco Portin
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Footer;
