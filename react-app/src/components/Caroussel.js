import React from 'react';

import './CSS/Caroussel.css'

function Caroussel(genre) {
    const movies = genre.movies
    console.log("GENRE", genre)

    let srcfunc = function(str) {
        let src = "https://"+str
        return src
    }

    return (
        <div className='lolomoRow'>
            <h3 className='rowHeader'>{genre.genre}</h3>
            <div className='rowContainer'>
                {movies.map((movie) => {
                    return(
                        <div className='rowItem'>
                            <img className='rowImg' src={movie?.backdrop} alt={`"${movie?.title}" backdrop`} />
                        </div>
                    )
                })}

            </div>
        </div>
    )
}
export default Caroussel;
