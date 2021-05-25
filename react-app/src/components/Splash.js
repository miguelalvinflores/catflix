import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { checkEmail } from '../store/session';

const Splash = () => {
    const [email, setEmail] = useState("");
    const [errorArr, setErrorArr] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory()


    const onGetStartedClick = async(e) => {
        e.preventDefault()
        let result = await dispatch(checkEmail(email))
        if (result.errors) {
            let errorList = [];
            for (let err in result.errors) {
                errorList.push(result.errors[err].split(":")[1]);
            }
            setErrorArr(errorList);
        } else {
            if (result.email) {
                history.push({
                    pathname: '/login',
                    state: {
                        userEmail: result.email
                    }
                })
            } else {
                history.push({
                    pathname: '/sign-up',
                    state: {
                        userEmail: email
                    }
                })
            }

        }

    }

    let emailCheckErrors = errorArr.map((err) => {
        return <li key={err}>{err}</li>;
    });

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
                    <form onSubmit={onGetStartedClick}>
                        <ul>{emailCheckErrors}</ul>
                        <label>Email address</label>
                        <input 
                            type="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        ></input>
                        <button type='submit'>Get Started</button>
                    </form>
                    <NavLink to='/signup'>Get Started</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Splash;
