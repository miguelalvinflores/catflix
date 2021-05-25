import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Browse = () => {
  const user = useSelector((state) => state.session.user);
  const profile = useSelector((state) => state.session.profile);
  if (user) {
    if (profile) {
      //   render browse
    }
  }
  return <h1>hi!</h1>;
};
