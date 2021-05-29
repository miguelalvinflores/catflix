import React from 'react';
import Carousel from "react-elastic-carousel";

function Slider(genre) {
    const movies = genre.movies
    console.log("GENRE", genre)

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2, itemsToScroll: 2 },
        { width: 768, itemsToShow: 3, itemsToScroll: 3 },
        { width: 1200, itemsToShow: 4, itemsToScroll: 4 }
      ];

    return (
        <div className='lolomoRow'>
            <h3 className='rowHeader'>{genre.genre}</h3>
            <div className='rowContainer'>
            <Carousel breakPoints={breakPoints}>
                {movies.map((item) => (
                    <Item key={item}>{item}</Item>
                ))}
            </Carousel>

            </div>
        </div>
    )
}
export default Slider;
