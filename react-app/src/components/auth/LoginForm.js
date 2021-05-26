import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { login } from "../../store/session";
import "./LoginForm.css";

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
    return <Redirect to="/" />;
  }

  return (
    <div className="form-container">
      <div className="main-form">
        <h1 className="form-label">Sign In</h1>
        <form onSubmit={onLogin}>
          <div>
            {errors.map((error) => (
              <div>{error}</div>
            ))}
          </div>
          <div>
            {/* <label htmlFor="email">Email</label> */}
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
              className="input-field"
            />
          </div>
          <div>
            {/* <label htmlFor="password">Password</label> */}
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
              className="input-field"
            />
            <div></div>
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
