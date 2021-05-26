import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { login } from "../../store/session";
import Footer from "../Footer.js";
import "../CSS/LoginForm.css";

const LoginForm = () => {
  const location = useLocation();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState(
    location.state ? location.state.userEmail : ""
  );
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/browse" />;
  }

  return (
    <div className="form-wrapper">
      <img
        className="hero-card-img"
        src="images/Splash-background.png"
        alt="Example Movie title panel"
      />
      <div className="form-container">
        <div className="main-form">
          <h1 className="form-label">Sign In</h1>
          <form onSubmit={onLogin}>
            <div>
              {errors.map((error) => (
                <div className="error">{error}</div>
              ))}
            </div>
            <div id="float-label">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="text"
                // placeholder="Email"
                value={email}
                onChange={updateEmail}
                className="input-field"
              />
            </div>
            <div id="float-label">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                // placeholder="Password"
                value={password}
                onChange={updatePassword}
                className="input-field"
              />
              <div></div>
              <button type="submit" className="sign-in-button">
                Sign In
              </button>
              <div className="form-other-details">
                <p>
                  New to Netflix?{" "}
                  <a className="sign-up-link" href="/sign-up">
                    {" "}
                    Sign up now
                  </a>{" "}
                </p>
                <p className="recaptcha-terms-of-use">
                  This page is protected by Google reCAPTCHA to ensure you're
                  not a bot. <span className="recaptcha-link">Learn more</span>.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginForm;
