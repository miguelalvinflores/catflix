import React from 'react';
import { NavLink } from 'react-router-dom';
import './CSS/Splash.css'

const Splash = () => {
    // const dispatch = useDispatch();

    return (
        <div className="story-cards">
            <div className="story-card hero-card">
                <div className="hero-card-background">
                    <img className='hero-card-img' src='images/Splash-background.png' alt="Example Movie title panel" />
                    <div class="concord-img-gradient"></div>
                </div>
                <div className="story-card-text">
                    <h1 className="story-card-title">
                        Unlimited Cat Videos, Cat Meows, and Purrs.
                    </h1>
                    <h2 className="story-card-subtitle">
                        Watch cats anywhere, upvote the furriest ones
                    </h2>
                    <div className="story-signup-button">
                    <h3 className="story-signup-text">Ready to watch?</h3>
                    <NavLink to='/signup'>Get Started</NavLink>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Splash;
