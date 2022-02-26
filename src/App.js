import React, { Component } from 'react';
import HomeComponent from './components/HomeComponent';
import QuizComponent from './components/QuizComponent';
import ResultComponent from './components/ResultComponent';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';

class App extends Component{
  constructor(){
    super()
    this.state={
      correct: 0, 
      wrong: 0,
      attempt:0
    }
  }

  checkCorrect = () =>{
    this.setState({
      correct: this.state.correct+1
    })
  }

  isAttempt = () =>{
    this.setState({
      attempt: this.state.attempt+1
    })
  }

  checkWrong = () =>{
    this.setState({
      wrong: (this.state.attempt - this.state.correct)+1
    })
  }

  render(){
  return(
    <div className ="App">
      <Router>
        <Switch>
          <Route exact path = '/project-Builder-stage-IV-quiz-complete'>
            <HomeComponent />
          </Route>
          <Route path="/QuizComponent">
            <QuizComponent checkCorrect={this.checkCorrect} isAttempt={this.isAttempt} checkWrong={this.checkWrong}/>
          </Route>
          <Route path='/ResultComponent'>
            <ResultComponent {...this.state} />
          </Route>
        </Switch>
      </Router>
    </div>
    
  );
}
}

export default App;