import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import searchicon from "../images/searchicon.png";
import * as movieActions from "../store/movie";
import "./CSS/SearchBar.css";

function Searchbar({home}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  // console.log("LOCATION", location.pathname)
  useEffect(() => {
    if (home) {
      setSearchTerm("")
      setSearchActive(false)
      return
    }
    if (searchActive) {
      if (searchTerm) {
        const timeout = setTimeout(() => {
          dispatch(movieActions.searchMovies(searchTerm));
          history.push("/search");

        }, 500)
        return () => clearTimeout(timeout)
      } else {
        history.push("/browse");
      }
    } else {
      history.push("/browse");
    }

  }, [searchTerm, dispatch, history, searchActive, home]);

  const handleClickOut = (e) => {
    e.preventDefault();
    if (!searchTerm) {
      setSearchActive(false);
    }
  };

  return (
    <div className="search-bar__container">
      {searchActive ? (
        <input
          className="search-bar"
          placeholder="Title, description, genres"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onBlur={handleClickOut}
          autoFocus
        />
      ) : (
        <img
          className="search-icon"
          src={searchicon}
          onClick={(e) => setSearchActive(true)}
          alt="Search Icon"
        />
      )}
    </div>
  );
}

export default Searchbar;
