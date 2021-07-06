import React from "react";
import { useSelector } from "react-redux";

function Bookmarks() {
    const bookmarks = useSelector((state) => state.profile.profile[0].bookmarks)
    console.log(bookmarks, "PROFILE")
    return (
        <div className='gallery'>
            <div className='gallery content'>

            </div>
        </div>
    )
}

export default Bookmarks;
