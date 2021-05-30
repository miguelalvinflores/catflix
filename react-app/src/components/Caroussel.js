import React from "react";

import "./CSS/Caroussel.css";
import Slider from "./NetflixSlider";

function Caroussel(genre) {
  const movies = genre.movies;
  console.log("GENRE", genre);

  // let srcfunc = function(str) {
  //     let src = "https://"+str
  //     return src
  // }

  return (
    <div className="lolomoRow">
      <h3 className="rowHeader">{genre.genre}</h3>
      <div className="rowContainer">
        <Slider>
          {(movies) && movies.map((movie) => {
            console.log("ROW MOVIES", movies)
            return (
              <Slider.Item movie={movie} key={movie.id}>
                item1
              </Slider.Item>
            )
          })}
        </Slider>
      </div>
    </div>
  );
}
export default Caroussel;
