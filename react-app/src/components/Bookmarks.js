import React from "react";
import { useSelector } from "react-redux";
import MovieTile from "./MovieTile";
import './CSS/Bookmarks.css'

function Bookmarks() {
    const user = useSelector((state) => state.session.user);
    const profile = useSelector((state) => state.profile.profile);
    const bookmarks = useSelector((state) => state.profile.profile[0].bookmarks)
    // console.log(bookmarks, "PROFILE")
    if (user) {
        if (profile) {
            return (
                <div className='bookmark-gallery'>
                    <div className='bookmark-gallery-content'>
                        {Object.keys(bookmarks)?.map((key) => {
                            // console.log(bookmarks[key])
                            return (
                                <MovieTile movie={bookmarks[key]} />
                            )
                        })}
                    </div>
                </div>
            )

        }
    }
}

export default Bookmarks;
