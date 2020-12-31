import React, { Component, Fragment } from 'react'
import {Helmet} from 'react-helmet';
import ClockOutlineIcon from 'mdi-react/ClockOutlineIcon';
import M from 'materialize-css';
import classnames from 'classnames';


import questions from '../../questions.json';
import isEmpty from '../../functions/is-empty';

class Play extends Component{
    constructor(props){
        super(props);
        this.state={
            questions,
            currentQuestion: {},
            nextQuestion: {},
            previousQuestion: {},
            options: [],
            optionA: {},
            optionB: {},
            optionC: {},
            optionD: {},
            answer: '',
            nextButtonDisabled:false,
            previousButtonDisabled: true,
            numberOfQuestions: 10,
            optionsIndex: 0,
            numberOfAnsweredQuestions: 0,
            currentQuestionIndex: 0,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            time: {}
        };
        this.interval = null;
    }

    componentDidMount () {
        const {questions, currentQuestion, nextQuestion, previousQuestion} = this.state;
        this.displayQuestions(questions,currentQuestion, nextQuestion, previousQuestion);
        this.startTimer();
    }
    componentWillUnmount(){
        clearInterval(this.interval);
    }
    displayQuestions = (questions=this.state.questions, currentQuestion,nextQuestion,previousQuestion) => {
            let {currentQuestionIndex} = this.state;
            if(!isEmpty(this.state.questions)){
                    questions = this.state.questions;
                    currentQuestion = questions[currentQuestionIndex];
                    nextQuestion=questions[currentQuestionIndex+1];
                    previousQuestion=questions[currentQuestionIndex-1];
                    const answer=currentQuestion.answer;
                    this.setState(
                        {
                            currentQuestion,
                            nextQuestion,
                            previousQuestion,
                            answer
                        },()=>{
                            this.handleDisabledButtons();
                        }
                    );
            }
    };

    handleOptionClick=(e)=>{
       if(e.target.innerHTML.toLowerCase()===this.state.answer.toLowerCase()){
           this.correctAnswer();
       }
       else{
           this.wrongAnswer();
       }
    }
    handleNextButtonClick=()=>{
        if(this.state.nextQuestion!==undefined){
            this.setState(prevState=>({
                currentQuestionIndex: prevState.currentQuestionIndex+1
            }), ()=>{this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            });
        }
    };
    handlePreviousButtonClick=()=>{
        if(this.state.previousQuestion!==undefined){
            this.setState(prevState=>({
                currentQuestionIndex: prevState.currentQuestionIndex-1
            }), ()=>{this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            });
        }
    };
    
    handleQuitButtonClick=()=>{
            if( window.confirm('Are you sure that you want to quit?')){
                this.props.history.push('/');
            }

    };

    handleButtonClick=(e)=>{
            switch(e.target.id) {
                case 'next-button':
                    this.handleNextButtonClick();
                    break;
                case 'previous-button':
                    this.handlePreviousButtonClick();
                    break;
                case 'quit-button':
                    this.handleQuitButtonClick();
                    break;
                default:
                    break;
            }
    }
    correctAnswer=()=>{
        M.toast(
            {
                html: 'Correct Answer!',
                classes: 'toast-valid',
                displayLength: 1000,
            }
        );
        this.setState(prevState=>({
            score: prevState.score+1,
            correctAnswers: prevState.correctAnswers+1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions+1,
            currentQuestionIndex: prevState.currentQuestionIndex+1
        }), () =>{
            if(this.state.nextQuestion===undefined){
                this.endQuiz();
            }
            else{
            this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
        }  }
        );
    }

    wrongAnswer=()=>{
        M.toast(
            {
                html: 'Wrong Answer!',
                classes: 'toast-invalid',
                displayLength: 1000,
            }
        );
        this.setState(prevState=>({
            wrongAnswers: prevState.wrongAnswers+1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions+1,
            currentQuestionIndex: prevState.currentQuestionIndex+1
        }), () =>{
            if(this.state.nextQuestion===undefined){
                this.endQuiz();
            }
            else{
            this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
        }
     }
        );
    }

   startTimer = () =>{
       const countDownTime = Date.now() + 30000;
       this.interval = setInterval(()=>{
           const now = new Date();
           const difference = countDownTime-now;

           const minutes= Math.floor((difference%(1000*60*60))/(1000*60));
           const seconds=Math.floor((difference % (1000*60))/1000);

           if(difference<0)
             {
           clearInterval(this.interval);
           this.setState(
               {
                   time: {
                       minutes:0,
                       seconds:0
                   }
               }, ()=>{
                    this.endQuiz();
                });
            }
        
            else{ 
                this.setState({
                    time: {
                        minutes,
                        seconds,
                        difference
                    }
                });
            }
       },1000);
   }

   handleDisabledButtons=()=>{
       if(this.state.previousQuestion===undefined||this.state.currentQuestionIndex===0){
           this.setState(
               {
                   previousButtonDisabled: true
               }
           );
       }
       else{
           this.setState(
               {
               previousButtonDisabled: false
               }
           );
       }

       if(this.state.nextQuestion===undefined||this.state.currentQuestionIndex+1===this.state.numberOfQuestions){
        this.setState(
            {
                nextButtonDisabled: true
            }
        );
    }
    else{
        this.setState(
            {
            nextButtonDisabled: false
            }
        );
    }
   }

   endQuiz=()=>{
       alert("This is the end of the Quiz");
       const {state}= this;
       const playerStatistics={
           score: state.score,
           numberOfQuestions: state.numberOfQuestions,
           numberOfAnsweredQuestions:state.numberOfAnsweredQuestions,
           correctAnswers:state.correctAnswers,
           wrongAnswers:state.wrongAnswers
       };
       console.log(playerStatistics);
       this.props.history.push('/playsummary', playerStatistics);
   }

    render(){

        const { currentQuestion, currentQuestionIndex, numberOfQuestions, time } = this.state;
        return(
            <Fragment >
                <Helmet><title>FunQuiz - Quiz</title></Helmet>
                <div className="image-div"></div>
                <div id="play-quiz">
                <section className="playjs-section">
                    <div className="question-number-timer">
                        <span >{currentQuestionIndex+1} of {numberOfQuestions}</span>
                        <span ><ClockOutlineIcon className="ClockIcon" size="1rem" text-align="center" /><p id="quiztimer">{time.minutes}:{time.seconds}</p></span>
                    </div>
                    <div className="only-questions-answers">
                        <h5 className="question-section">{currentQuestion.question}</h5>
                        <div className="options-section">
                            <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionA}</p>
                            <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionB}</p>
                        </div>
                        <div className="options-section">
                            <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionC}</p>
                            <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionD}</p>
                        </div>
                    </div>
                    <div className="next-previous-section">
                        <button onClick={this.handleButtonClick}   className={classnames('', {'disable': this.state.previousButtonDisabled})} id="previous-button">Previous</button>
                        <button onClick={this.handleButtonClick}  className={classnames('', {'disable': this.state.nextButtonDisabled})} id="next-button">Next</button>
                        <button onClick={this.handleButtonClick} className="quit-quiz quiz-buttons" id="quit-button">Quit</button>
                    </div>
                </section>
                </div>
            </Fragment>
        );
    }
}
export default Play;