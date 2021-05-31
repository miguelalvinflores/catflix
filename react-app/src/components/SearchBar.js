import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as movieActions from "../store/movie";
import "./CSS/SearchBar.css"

function Searchbar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allMovie = useSelector((state) => state.movie?.allMovies);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  // console.log("LOCATION", location.pathname)
  useEffect(() => {
    if (searchActive) {
      if (searchTerm) {
        dispatch(movieActions.searchMovies(searchTerm));
        history.push("/search");
      } else {
        history.push("/browse");
      }
    } else {
      history.push("/browse")
    }

  }, [searchTerm, dispatch]);
  
  const handleClickOut = (e) => {
      e.preventDefault()
      if (!searchTerm) {
        setSearchActive(false)
      }
  }


  return (
    <div className="search-bar__container">
      {searchActive ? 
      <input
        className="search-bar"
        placeholder="Title, description, genres"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onBlur={handleClickOut}
        autoFocus
      /> :
      <img className="search-icon" src="images/search-icon.png" onClick={(e) => setSearchActive(true)}/>
      }
    </div>
  );
}

export default Searchbar;
