import React, { Component } from 'react'
import './App.css';
import HomeComponent from './components/HomeComponent';
import QuizComponent from './components/QuizComponent';
import ResultComponent from './components/ResultComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      ans: [],
      res: "",
      ques: []
    }
  }
  getAns = (newAns) => {
    this.setState({
      ans: [...newAns]
    })
  }
  componentDidMount = () => {
    axios.get('https://my-json-server.typicode.com/Naveen132895/quiz-api/questions')
      .then((res) => {
        this.setState({
          ques: res.data
        })
        console.log(this.state.ques)
      })
  }
  render() {
    if (this.state.ques.length === 0) {
      return <img src="/load.gif" alt="" />;
    } else {
      return (
        <div className="App">
          <Router>
            <Switch>
              <Route exact path="/"><HomeComponent /></Route>
              <Route path="/quiz"><QuizComponent sentAns={this.getAns} /></Route>
              <Route path="/result"><ResultComponent sentAns={this.state.ans} /></Route>
            </Switch>
          </Router>
        </div>
      );
    }
  }
}
