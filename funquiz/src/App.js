//this js file is like the entry point of my application

import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Home from "./components/Home";
import Instructions from "./components/quiz/Instructions";
import Play from "./components/quiz/Play";
import Summary from "./components/Summary";


function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/instructions" exact component={Instructions} />
      <Route path="/playquiz" exact component={Play} />
      <Route path="/playsummary" exact component={Summary} />
   </Router>
   
  );
}

export default App;
