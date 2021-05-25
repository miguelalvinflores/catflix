import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";

const SignUpForm = () => {
  const [membership, setMembership] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorArr, setErrorArr] = useState([]);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

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
    setMembership(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/browse" />;
  }
  let signupErrors = errorArr.map((err) => {
    return <li key={err}>{err}</li>;
  });

  return (
    <form onSubmit={onSignUp}>
      <ul>{signupErrors}</ul>
      <div>
        <label>Membership</label>
        <input
          type="radio"
          name="membership"
          onChange={updateMembership}
          value="1"
          checked={membership === "1"}
          required={true}
        ></input>
        <label>Standard</label>
        <input
          type="radio"
          name="membership"
          onChange={updateMembership}
          value="2"
          checked={membership === "2"}
        ></input>
        <label>Deluxe</label>
        <input
          type="radio"
          name="membership"
          onChange={updateMembership}
          value="3"
          checked={membership === "3"}
        ></input>
        <label>Premium</label>
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
          required={true}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
          required={true}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
