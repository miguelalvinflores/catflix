import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import Splash from "./components/Splash"
import Browse from "./components/Browse"
import ManageProfiles from "./components/ManageProfiles"
import { authenticate } from "./store/session";
import './index.css'

function App() {
  const user = useSelector(state => state.session.user)
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <div id="app-mount-point">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/" exact={true} >
            <Splash />
          </Route>
          <Route path="/login" exact={true}>
            <LoginForm />
          </Route>
          <Route path="/sign-up" exact={true}>
            <SignUpForm />
          </Route>
          <Route path="/browse" exact={true}>
            <Browse />
          </Route>
          <Route path="/manage_profiles" exact={true}>
            <ManageProfiles />
          </Route>
          <ProtectedRoute path="/users" exact={true} >
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path="/users/:userId" exact={true} >
            <User />
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
