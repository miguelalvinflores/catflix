import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkEmail } from "../store/session";
import Footer from './Footer'
import "./CSS/Splash.css";
import Splashbackground from '../images/Splashbackground.png'
import splashDeviceScreens from '../images/splashDeviceScreens.png'
const Splash = () => {
    const user = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [errorArr, setErrorArr] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleTextChange = (text) => {
        setEmail(text);

        if (text !== "") {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    };

    const onGetStartedClick = async (e) => {
        e.preventDefault();
        let result = await dispatch(checkEmail(email));
        if (result.errors) {
            let errorList = [];
            for (let err in result.errors) {
                errorList.push(result.errors[err].split(":")[1]);
            }
        setErrorArr(errorList);
        } else {
            if (result.email) {
                history.push({
                    pathname: "/login",
                        state: {
                            userEmail: result.email,
                        },
                });
            } else {
                history.push({
                    pathname: "/sign-up",
                    state: {
                        userEmail: email,
                    },
                });
            }
        }
  };

    let emailCheckErrors = errorArr.map((err) => {
        return <li key={err}>{err}</li>;
    });

    if (user) {
        return <Redirect to='/browse' />
    }

    return (
        <div className="story-cards">
            <div className="hero-card">
                <div className="hero-card-background">
                    <img className='hero-card-img' src={Splashbackground} alt="Example Movie title panel" />
                    <div className="concord-img-gradient"></div>
                </div>
                <div className="hero-story-card-text">
                    <h1 className="story-card-title">
                        Unlimited Cat Paws, Meows, and Purrs.
                    </h1>
                    <h2 className="story-card-subtitle">
                        Watch cats doing cat things anywhere, upvote the cattiest ones.
                    </h2>
                    <div className="story-signup-button">
                        <h3 className="story-signup-text">Ready to watch? Enter your email to create your account.</h3>
                        <form className='email-form' onSubmit={onGetStartedClick}>
                            <ul>{emailCheckErrors}</ul>
                            <div className='email-form-lookup'>
                                <div id='float-label'>
                                    <input
                                        type="email"
                                        name="email"
                                        id='email_hero'
                                        onChange={(e) => handleTextChange(e.target.value)}
                                        required
                                    />
                                    <label className={ isActive ? "Active" : ""} htmlFor='email_hero'>Email address</label>
                                </div>
                                <button className='hero-btn-red' type='submit'>Get Started {'>'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className='card-spacer'></div>
            <div className='story-card watchOnPC'>
                <div className='story-card-container'>
                    <div className='story-card-text'>
                        <h1 className='story-card-title'>Enjoy your cat content.</h1>
                        <h2 className='story-card-subtitle'>Stream cat clips on your phone, tablet, laptop, and any other devices with internet browser access.</h2>
                    </div>
                    <div className='story-card-img-container'>
                        <img className='-card-img' src={splashDeviceScreens} alt="Example Movie title panel" />
                    </div>
                </div>
            </div>
            <div className='splashfooter'>
                <Footer />
            </div>
        </div>
    );
};

export default Splash;
