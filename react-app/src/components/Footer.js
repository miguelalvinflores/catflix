import React from "react";
import "./CSS/Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="bio-container">
        <section>
          <ul className="icons">
            <li>
              <a href="" class="icon brands fa-github alt"></a>
              <span>Alvin Huang</span>
            </li>
            <li>
              <a href="" class="icon brands fa-github alt"></a>Miguel Flores
            </li>
            <li>
              <a href="">
                <i class="fab fa-github"></i>
              </a>
              Franco Portin
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Footer;
