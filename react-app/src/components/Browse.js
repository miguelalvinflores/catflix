import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SelectProfile from "./SelectProfile"
import BrowseVids from './BrowseVids'
const Browse = () => {
  const user = useSelector((state) => state.session.user);
  const profile = useSelector((state) => state.profile.profile);
  if (user) {
    if (profile) {
      //   render browse
      console.log("I went to if")
      return <BrowseVids />
    } else {
      // modal force them pick profile
      console.log("I went to else")
      return <SelectProfile />
    }
  }

  console.log("Did not enter")
  return <h1>hi!</h1>;
  // <navbar>
  //     <search component />
  //     <tabs/>
  //  </navbar>
};


export default Browse;
