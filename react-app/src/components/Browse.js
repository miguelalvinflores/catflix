import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer";
import SelectProfile from "./SelectProfile";
import BrowseVids from "./BrowseVids";
import * as profileActions from "../store/profile"
import "./CSS/Browse.css";
const Browse = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const profile = useSelector((state) => state.profile.profile);
//   useEffect(() => {
//     if (profile) {
//       dispatch(profileActions.retrieveBookmarks(profile[0].id))
//     }
// }, [ dispatch, profile]);
  if (user) {
    if (profile) {
      //   render browse
      // console.log("I went to if")
      return (
        <div className="mainView">
          <BrowseVids />
          <Footer />
        </div>
      );
    } else {
      // modal force them pick profile
      // console.log("I went to else")
      return <SelectProfile />;
    }
  }

  // console.log("Did not enter")
  return <h1>hi!</h1>;
  // <navbar>
  //     <search component />
  //     <tabs/>
  //  </navbar>
};

export default Browse;
