import React, { Fragment } from 'react'
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';


const Instructions = () => (
    <Fragment id="instructions-body">
        <Helmet><title>Quiz Instructions</title></Helmet>
        <div className="instructions-body">
            <h2 className="instructions-heading1">How to play this Quiz</h2>
            <div >
                <ol className="instructions-list">
                    <li>There are five questions.</li>
                    <li>Each question has four options to choose an answer.</li>
                    <li>One of them is right.</li>
                    <li>Failing to click the right answer deducts the points.</li>
                </ol>
            </div>
            <h6 className="instructions-heading2">I hope you got the rules.</h6>
        </div>
        <div className="goto">
            <span><Link className="gotohome" to="/">No, take me back to the home page</Link></span>
            <span><Link className="gotogame" to="/playquiz">Yes, I'm ready the Quiz</Link></span>
        </div>
    </Fragment>
);

export default Instructions;