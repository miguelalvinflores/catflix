import React, { useState, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import Splash from "./components/Splash";
import Browse from "./components/Browse";
import Watch from "./components/Watch";
import SearchPage from "./components/SearchPage";
import ManageProfiles from "./components/ManageProfiles";
import CreateProfile from "./components/CreateProfile";
import Bookmarks from "./components/Bookmarks";
import { authenticate } from "./store/session";
import * as profileActions from "./store/profile"
import "./index.css";

function App() {
  const user = useSelector((state) => state.session.user);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      const profile = localStorage.getItem('chosenProfile');
      // console.log(JSON.parse(profile))
      if (profile) {
        await dispatch(profileActions.selectProfile(JSON.parse(profile)))
      }
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }
  let loggedIn = false;
  if (user) {
    loggedIn = true;
  }

  return (
    <div id="app-mount-point">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/" exact={true}>
            <Splash />
          </Route>
          <Route path="/login" exact={true}>
            <LoginForm />
          </Route>
          <Route path="/sign-up" exact={true}>
            <SignUpForm />
          </Route>
          <Route path="/browse" exact={true}>
            {loggedIn ? <Browse /> : <Redirect to='/' />}
          </Route>
          <Route path="/manage_profiles" exact={true}>
            {loggedIn ? <ManageProfiles /> : <Redirect to='/' /> }
          </Route>
          <Route path="/search" exact={true}>
            {loggedIn ? <SearchPage /> : <Redirect to='/' /> }
          </Route>
          {/* <ProtectedRoute path="/create_profile" exact={true}>
            <CreateProfile />
          </ProtectedRoute> */}
          <ProtectedRoute path="/watch/:movieId" exact={true}>
            <Watch />
          </ProtectedRoute>
          <ProtectedRoute path="/users" exact={true}>
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path="/users/:userId" exact={true}>
            <User />
          </ProtectedRoute>
          <ProtectedRoute path="/watch/:movieId" exact={true}>
            <Watch />
          </ProtectedRoute>
          <ProtectedRoute path='/bookmarks' exact={true}>
            <Bookmarks />
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
