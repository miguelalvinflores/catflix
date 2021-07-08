import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom"

import MovieTile from "./MovieTile"
import "./CSS/SearchPage.css"


const SearchPage = () => {
    const user = useSelector((state) => state.session.user);
    const profile = useSelector((state) => state.profile.profile);
    if (user) {
        if (profile) {
            //   render search
            return (
                <div className="full-search-page__container">
                    <div className="search-page__container">
                        <MovieTile />
                    </div>
                </div>
            )
           
        } else {
            // redirect to /browse to either sign in or choose profile.
            return <Redirect to='/browse' />
            
        }
    }

    return <></>;
};


export default SearchPage;
