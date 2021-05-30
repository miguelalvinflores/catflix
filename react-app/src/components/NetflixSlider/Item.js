import React from 'react';
import cx from 'classnames';
import { NavLink } from "react-router-dom";

import SliderContext from './context'
import ShowDetailsButton from './ShowDetailsButton'
import Mark from './Mark'
import './Item.css'

const Item = ({ movie }) => (
  <SliderContext.Consumer>
    {({ onSelectSlide, currentSlide, elementRef }) => {
      const isActive = currentSlide && currentSlide.id === movie.id;

      return (
        <div
          ref={elementRef}
          className={cx('item', {
            'item--open': isActive,
          })}
        >
          <img src={movie.backdrop} alt="" />
          <NavLink
            to={`/watch/${movie?.id}`}
            className='watchmovie'
            style={{ textDecoration: 'none' }}
          >
            <button className='watch-page-button'>
              <span></span>
            </button>
          </NavLink>

          <ShowDetailsButton onClick={() => onSelectSlide(movie)} />
          {isActive && <Mark />}
        </div>
      );
    }}
  </SliderContext.Consumer>
);

export default Item;
