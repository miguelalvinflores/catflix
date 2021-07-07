import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom"

import MovieTileSearch from "./MovieTileSearch"
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
                        <MovieTileSearch />
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
