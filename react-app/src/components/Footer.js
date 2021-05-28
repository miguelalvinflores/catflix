import React from "react";
import { Link } from "react-router-dom";
import "./CSS/Footer.css";

const Footer = ({ className }) => {
  return (
    <div className={`footer-container ${className}`}>
      <div className="mdb-credit-container">
        {/* <p className="mdb-credit"> */}
        All movie information is sourced through themoviedb.org's API
        {/* </p> */}
      </div>
      <div className="bio-container">
        <section>
          <ul className="icons">
            <li>
              <div className="github-bio">
                <a href="https://github.com/miguelalvinflores">
                  <i className="fab fa-github fa-3x"></i>
                </a>
                Miguel Flores
              </div>
            </li>
            <li>
              <div className="github-bio">
                <a href="https://github.com/huang-alvin">
                  <i className="fab fa-github fa-3x"></i>
                </a>
                Alvin Huang
              </div>
            </li>
            <li>
              <div className="github-bio">
                <a href="https://github.com/fportin">
                  <i className="fab fa-github fa-3x"></i>
                </a>
                Franco Portin
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Footer;
