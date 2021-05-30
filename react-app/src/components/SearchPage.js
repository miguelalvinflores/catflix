import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MovieTile from "./MovieTile"
import "./CSS/SearchPage.css"


const SearchPage = () => {
    const user = useSelector((state) => state.session.user);
    const profile = useSelector((state) => state.profile.profile);
    if (user) {
        if (profile) {
            //   render search
            console.log("I went to if")
            return (
                <div className="search-page_container">
                    <MovieTile />
                </div>
            )
           
        } else {
            // redirect to /browse to either sign in or choose profile.
            console.log("I went to else")
            
        }
    }

    console.log("Did not enter")
    return <h1>hi!</h1>;
    // <navbar>
    //     <search component />
    //     <tabs/>
    //  </navbar>
};


export default SearchPage;
