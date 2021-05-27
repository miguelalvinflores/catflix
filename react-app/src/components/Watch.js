import React, { useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// grab movieId from useParams make api call to back end for movie Object
// pass movie.url into video component as prop

const Watch = () => {
  const { movieId } = useParams();
  const movieObj = fetch(`/api/movies/${movieId}`).then((res) =>
    console.log(res)
  );
  // console.log(movieObj);

  return (
    <>
      <div className="video-container">{/* video component */}</div>
      {/* carousel: top picks for you */}
      {/* detail component */}
    </>
  );
};
export default Watch;
