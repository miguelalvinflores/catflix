import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { signUp } from "../../store/session";

import '../CSS/SignUpPage.css'

const SignUpForm = () => {
  const location = useLocation()
  const [membership, setMembership] = useState("");
  const [email, setEmail] = useState(location.state ? location.state.userEmail : "");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorArr, setErrorArr] = useState([]);
  const [emailActive, setEmailActive] = useState(false);
  const [passwordActive, setPasswordActive] = useState(false);
  const [repeatPasswordActive, setRepeatPasswordActive] = useState(false);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.state) {
      setEmailActive(true)
    }
  }, [])

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      setErrorArr([]);
      let membershipId = parseInt(membership);
      let result = await dispatch(signUp(membershipId, email, password));
      if (result.errors) {
        let errorList = [];
        for (let err in result.errors) {
          errorList.push(result.errors[err].split(":")[1]);
        }
        setErrorArr(errorList);
      }
    } else {
      setErrorArr(["passwords do not match"]);
    }
  };

  const updateMembership = (e) => {
    let standardRadio = document.querySelector('.standard-radio-container')
    let deluxeRadio = document.querySelector('.deluxe-radio-container')
    let premiumRadio = document.querySelector('.premium-radio-container')

    setMembership(e.target.value);
    console.log(e.target.value)
    if (e.target.value === "1") {
      deluxeRadio.classList.remove('checked')
      premiumRadio.classList.remove('checked')
      standardRadio.classList.add('checked')
    } else if (e.target.value === "2") {
      standardRadio.classList.remove('checked')
      premiumRadio.classList.remove('checked')
      deluxeRadio.classList.add('checked')
    } else if (e.target.value === "3") {
      premiumRadio.classList.add('checked')
      standardRadio.classList.remove('checked')
      deluxeRadio.classList.remove('checked')
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
    if (e.target.value !== '') {
      setEmailActive(true)
    } else {
      setEmailActive(false)
    }
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value !== '') {
      setPasswordActive(true)
    } else {
      setPasswordActive(false)
    }
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
    if (e.target.value !== '') {
      setRepeatPasswordActive(true)
    } else {
      setRepeatPasswordActive(false)
    }
  };

  if (user) {
    return <Redirect to="/browse" />;
  }
  let signupErrors = errorArr.map((err) => {
    return <li key={err}>{err}</li>;
  });

  return (
    <div className="signup-form__container">
      <div className="signup-logo"></div>
      <div className="signup-text">
        <div className="signup-greeting">Joining Catflix is easy.</div>
        <div className="signup-instructions">Complete the form below and you'll be watching in no time.</div>
      </div>
      <form className='signup-form' onSubmit={onSignUp}>
      <ul>{signupErrors}</ul>
      <div className="email-input-box">
        <input
          type="email"
          name="email"
          onChange={updateEmail}
          value={email}
          required={true}
        ></input>
        <label className={ emailActive ? "active" : ""}>Email</label>
      </div>
      <div className="password-input-box">
        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
          required={true}
        ></input>
        <label className={passwordActive ? "active" : ""}>Password</label>
      </div>
      <div className="repeat-password-input-box">
        <input
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
          <label className={repeatPasswordActive ? "active" : ""}>Repeat Password</label>
      </div>
      <label className="membership-label">Choose your Plan:</label>
      <div className="membership-container">
        <input
          type="radio"
          name="membership"
          onChange={updateMembership}
          value="1"
          checked={membership === "1"}
          required={true}
          id="standard"
        ></input>
        <label htmlFor="standard">
          <div className="standard-radio-container">Standard</div>
        </label>
        <input
          type="radio"
          name="membership"
          onChange={updateMembership}
          value="2"
          checked={membership === "2"}
          id="deluxe"
        ></input>
        <label htmlFor="deluxe">
          <div className="deluxe-radio-container">Deluxe</div>
        </label>
        <input
          type="radio"
          name="membership"
          onChange={updateMembership}
          value="3"
          checked={membership === "3"}
          id="premium"
        ></input>
        <label htmlFor="premium">
          <div className="premium-radio-container">Premium</div>
        </label>
      </div>
      <button className="signup-button" type="submit">Sign Up</button>
    </form>

    </div>
  );
};

export default SignUpForm;
