import React from 'react';
import { NavLink } from 'react-router-dom';

const Splash = () => {
    // const dispatch = useDispatch();

    return (
        <div className="story-cards">
            <div className="story-card">
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
