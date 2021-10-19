import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Questions from '../resourses/questions.json'

export default class QuizComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qid: 0,
            time: 250,
            ans: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ques: []
        }
        this.intervalId = setInterval(this.timer.bind(this), 1000)
        this.removeId = setInterval(this.removeAns.bind(this), 2000);
    }

    componentDidMount = () => {
        axios.get('https://my-json-server.typicode.com/Naveen132895/quiz-api/questions')
            .then((res) => {
                this.setState({
                    ques: res.data
                })
            })
    }

    nextQ = () => {
        this.setState({
            qid: this.state.qid + 1
        })
        if (this.state.qid >= 13) {
            document.getElementById("next").classList.add("dis");
            this.setState({
                qid: 14
            })
        } else {
            document.getElementById("prev").classList.remove("dis");
        }
    }

    prevQ = () => {
        this.setState({
            qid: this.state.qid - 1
        })
        if (this.state.qid <= 1) {
            document.getElementById("prev").classList.add("dis");
            this.setState({
                qid: 0
            })
        } else {
            document.getElementById("next").classList.remove("dis");
        }
    }

    quitBtn = () => {
        clearInterval(this.intervalId);
        clearInterval(this.removeId);
        this.props.sentAns(this.state.ans);
    }

    timer = () => {
        this.setState({
            time: this.state.time - 1
        })
        if (this.state.time < 1) {
            this.quitBtn();
        }
    }

    optionSelect = (e) => {
        let span = document.createElement("span");
        if (Questions[this.state.qid].answer === e.target.value) {
            span.textContent = "Correct Answer";
            span.classList.add("yes");
            let newAns = [...this.state.ans];
            newAns[this.state.qid] = 1;
            this.setState({
                ans: [...newAns]
            })
        } else {
            span.textContent = "Wrong Answer";
            span.classList.add("no");
            let newAns = [...this.state.ans];
            newAns[this.state.qid] = -1;
            this.setState({
                ans: [...newAns]
            })
        }
        document.getElementById("ans").appendChild(span);
        this.nextQ()
    }

    removeAns = () => {
        let spans = document.getElementById("ans");
        if (spans === null) {
            clearInterval(this.removeId);
        } else {

            if (spans.hasChildNodes()) {
                spans.removeChild(spans.firstChild);
            }
        }
    }

    render() {
        return (
            <div className="box">
                <h1>Question</h1>
                <div className="ans" id="ans"></div>
                <div className="QueData">
                    <span>{this.state.qid + 1} of {Questions.length}</span>
                    <span>{Questions[this.state.qid].question}</span>
                    <span>{this.state.time} <img src="https://emojipedia-us.s3.amazonaws.com/source/skype/289/twelve-thirty_1f567.png" alt="stopwatch" height="30px" /></span>
                </div>
                <div className="options">
                    <button onClick={this.optionSelect} value={Questions[this.state.qid].optionA}>{Questions[this.state.qid].optionA}</button>
                    <button onClick={this.optionSelect} value={Questions[this.state.qid].optionB}>{Questions[this.state.qid].optionB}</button>
                    <button onClick={this.optionSelect} value={Questions[this.state.qid].optionC}>{Questions[this.state.qid].optionC}</button>
                    <button onClick={this.optionSelect} value={Questions[this.state.qid].optionD}>{Questions[this.state.qid].optionD}</button>
                </div>
                <div className="bottom">
                    <button onClick={this.prevQ} id="prev" className="dis">Previous</button>
                    <button onClick={this.nextQ} id="next">Next</button>
                    <Link to="/result" onClick={this.quitBtn}>Quit</Link>
                </div>
            </div>
        )
    }
}
