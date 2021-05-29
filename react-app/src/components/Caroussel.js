import React from 'react';

function Caroussel(genre) {
    const movies = genre.movies
    console.log("GENRE", genre)

    return (
        <div className='lolomoRow'>
            <h3 className='rowHeader'>{genre.genre}</h3>
            <div className='rowContainer'>
                {movies.map((movie) => {
                    <div className=''> </div>
                })}

            </div>
        </div>
    )
}
export default Caroussel;
