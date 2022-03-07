import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class HomeComponent extends Component {
    render() {
        return (
            <React.Fragment>
                <h1>Quiz App</h1>
                <Link to="/quiz"><button>Play</button></Link>
            </React.Fragment>
        )
    }
}