import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import {Link} from 'react-router-dom';
import CubeOutlineIcon from 'mdi-react/CubeOutlineIcon';

const Home = () => (
    <Fragment>
        <Helmet><title>FunQuiz- Home</title>
        </Helmet>
        <div id="home"> 
            <section className="homejs-section">
                <div>
                <CubeOutlineIcon className="CubeIcon" size="8rem" text-align="center" />
                </div>
                <h1>QuizApp</h1>
                <div className="play-button-container">
                    <ul>
                        <li><Link className="play-button" to="/instructions">Play</Link></li>
                    </ul>
                </div>
                <div className="auth-container">
                    <Link className="auth-container-buttons " id="login-button" to="/login">Login</Link>
                    <Link className="auth-container-buttons " id="register-button" to="/register">Register</Link>
                </div>
            </section>
        </div>
    </Fragment>
   
    );

export default Home;