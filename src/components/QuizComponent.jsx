import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class QuizComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            indexValue:0,
            datas:[], 
            attempt: 0,
            currentCount:120,
        }
    }



    //Move to previous Qustion
    previousQues=()=>{
        if(this.state.indexValue === 0){
          alert("You need to start from here!")
        }
        else if(this.state.indexValue>0){
          this.setState({indexValue:this.state.indexValue-1})
        }
    }
    //Move to next question
    nextQues =()=>{
        if(this.state.indexValue<9)
        {
            this.setState({indexValue: this.state.indexValue + 1})
            setTimeout (this.hide,600)
        }
        else{
            alert("All Question Completed Click on Quit to Know Your result")
        }
    }

    //for hiding the popup button
    hide = () => {
        let btn = document.getElementById('answers')
        btn.style.display = 'none'
    }
    //Verify answer
    checkAnswer = (e)=>{
        let answers = e.target.value
        let btn = document.getElementById('answers')
        console.log(this.state.datas[this.state.indexValue].answer +" " +answers)
        this.props.isAttempt()
        if (this.state.datas[this.state.indexValue].answer===answers)
        {   
            btn.innerText="Correct"
            btn.style.backgroundColor='green'
            btn.style.display="block"
            this.nextQues()
            this.setState({
                correct : this.state.correct+1
                
            })
            this.props.checkCorrect()
            
        }
        else
        {
            btn.innerText = "Wrong"
            btn.style.backgroundColor = 'red'
            btn.style.animation = 'hideIt 1s forwards'
            btn.style.display = "block"
            this.nextQues()
            this.setState({
                wrong: (this.state.attempt - this.state.correct)+1
        })
        this.props.checkWrong()
    }
}
   componentDidMount(){
       axios.get('https://my-json-server.typicode.com/Naveen132895/quiz-api/questions').then((res)=>{
            this.setState({
                datas:res.data
            })
        
       })
       this.intervalId = setInterval(this.timer.bind(this), 1000)
   }

   timer() {
    let hide = document.getElementById('hide')
    let show = document.getElementById('show')
    this.setState({
        currentCount: this.state.currentCount - 1
    })
    if (this.state.currentCount < 1) {
        clearInterval(this.intervalId);
        hide.style.display='none'
        show.style.display='block'
    }
    
}
componentWillUnmount() {
    clearInterval(this.intervalId);
}


    render() {
        const isdata = this.state.datas.length
        const resultdata = this.state.datas[this.state.indexValue]
        //console.log(this.state.correct)
            return (
               <>
                    
                    <div className="main-container">
                        {isdata > 0 ?
                        <div className="quiz-container">
                            <div id="show" style={{display:'none'}}>
                                <h2>Time is up. Please click on Quit button to check the result</h2>
                            </div>
                            <div id="hide">
                                <h1>Question</h1>
                            <div className="question-container">
                                <h4>{resultdata.id} of 10</h4>
                                <h3>{resultdata.question}</h3>
                                <h5>{this.state.currentCount}</h5>
                            </div>
                            <div className="options" id="options">
                                <button className="button" onClick={this.checkAnswer} value={resultdata.options[0]}>{resultdata.options[0]}</button>
                                <button className="button" onClick={this.checkAnswer} value={resultdata.options[1]}>{resultdata.options[1]}</button>
                                <button className="button" onClick={this.checkAnswer} value={resultdata.options[2]}>{resultdata.options[2]}</button>
                                <button className="button" onClick={this.checkAnswer} value={resultdata.options[3]}>{resultdata.options[3]}</button>
                            </div>
                            </div>
                            <div className="buttons">
                                <button onClick={this.previousQues}>Previous</button>
                                <button onClick={ this.nextQues}>Next</button>
                                <button><Link to="/ResultComponent" className="link">Quit</Link></button>  
                            </div>
                            <div>
                                <button id="answers"></button>
                            </div>
                        </div>
                        :<div></div>}
                    </div>
                </>  
            );
          
    }
}