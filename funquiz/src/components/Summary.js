import React, {Component, Fragment} from 'react';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import CheckCircleOutlineIcon from 'mdi-react/CheckCircleOutlineIcon';

class Summary extends Component{
    constructor(props){
        super(props);
        this.state={
        score: 0,
        numberOfQuestions:0,
        numberOfAnsweredQuestions:0,
        correctAnswers:0,
        wrongAnswers:0
    };
    }

    componentDidMount(){
        const {state}= this.props.location;
        if(state){
        this.setState(
            {
                score: (state.score/state.numberOfQuestions)*100,
                numberOfQuestions:state.numberOfQuestions,
                numberOfAnsweredQuestions:state.numberOfAnsweredQuestions,
                correctAnswers:state.correctAnswers,
                wrongAnswers:state.wrongAnswers
            }
        );
        }
    }

    render(){
       const {state, score}= this.props.location;
       let statistics,remark;
       if(score<=30)
       {
           remark='You need more practice';
       }
       else if(score>30 && score<=60)
       {
           remark='Better luck next time';
       }
       else if(score>60 && score<=90)
       {
           remark='You can do even more better';
       }
       else{
           remark='You\'re great';
       }
       if(state !== undefined){
            statistics=(
               <Fragment>
                   <section className="quiz-stats-container">
                <div >
                    <span ><p className="greeting">Result</p><CheckCircleOutlineIcon className="CheckCirlceIcon" size="5rem" color="green" text-align="center" /></span>
                </div>
                <h3>Quiz has ended!</h3>
                <div className="only-stats">
                        <h4>{remark}</h4>
                        <h2>Score:{this.state.score.toFixed(0)}%</h2>

                        <span className="stats-left">Total number of questions:</span>
                        <span className="stats-right">{this.state.numberOfQuestions}</span><br/>

                        <span className="stats-left">Total number of  attempted questions:</span>
                        <span className="stats-right">{this.state.numberOfAnsweredQuestions}</span><br/>

                        <span className="stats-left">Number of correct answers:</span>
                        <span className="stats-right">{this.state.correctAnswers}</span><br/>

                        <span className="stats-left">Number of wrong answers:</span>
                        <span className="stats-right">{this.state.wrongAnswers}</span><br/>
                </div>
                <div className="home-quiz-container">
                            <Link className="takemeto take-home" to="/"> Back to Home</Link>
                            <Link className="takemeto take-quiz" to="/playquiz">Take Quiz Again</Link>
                        </div>
                </section>
               </Fragment>
            );
       }
       else{
            statistics=(
                <section>
                    <h2>No statistics available</h2>
                    <div>
                    <Link className="takemeto" to="/"> Back to Home</Link>
                    <Link className="takemeto" to="/playquiz">Take Quiz</Link>
                    </div>
                
            </section>
            );
       }
        return(
            <Fragment>
                <Helmet><title>Your Quiz Statistics</title>
                </Helmet>
            {statistics}
            </Fragment>
        );
    }
}

export default Summary;