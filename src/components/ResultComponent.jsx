import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ResultComponent extends Component{
    constructor(props)
    {
        super(props)
    }
    render(){
        console.log(this.props);
        return(
            <div className="result-main-container">
                <i class="fa fa-check-circle" aria-hidden="true"></i>
                <h1 className="result">Result</h1>
                <div className="result-container">
                    {this.props.correct*10<60?
                    <h3>You need more practice!</h3>
                    :
                    <h3>Well Done!</h3>
                    }
                    <h2>Your Score: {this.props.correct*10}</h2>
                    <p>Total number of question:<span>10</span></p>
                    <p>Number of attempted question:<span>{this.props.attempt}</span></p>
                    <p>Number of Correct Answers:<span>{this.props.correct}</span></p>
                    <p>Number of Wrong Answers:<span>{this.props.wrong}</span></p>
                </div>
                <div className="button-container">
                    <button><Link to="/QuizComponent" className="link">Play Again</Link></button>
                    <button><Link to="/project-Builder-stage-IV-quiz-complete" className="link">Back to Home</Link></button>
                </div>
            </div>
        )
    }
}
