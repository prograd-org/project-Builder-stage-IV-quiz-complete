import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Questions from '../resourses/questions.json'

export default class QuizComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qid: 0,
            time: 250,
            ans: []
        }
        this.intervalId = setInterval(this.timer.bind(this), 1000)
        this.removeId = setInterval(this.removeAns.bind(this), 2000);
    }

    nextQ = () => {
        this.setState({
            qid: this.state.qid + 1
        })
        if (this.state.qid >= this.props.ques.length - 2) {
            document.getElementById("next").classList.add("dis");
            this.setState({
                qid: this.props.ques.length - 1
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
        if (this.props.ques[this.state.qid].answer === e.target.value) {
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
                    <span>{this.state.qid + 1} of {this.props.ques.length}</span>
                    <span>{this.props.ques[this.state.qid].question}</span>
                    <span>{this.state.time} <img src="https://emojipedia-us.s3.amazonaws.com/source/skype/289/twelve-thirty_1f567.png" alt="stopwatch" height="30px" /></span>
                </div>
                <div className="options">
                    <button onClick={this.optionSelect} value={this.props.ques[this.state.qid].options[0]}>{this.props.ques[this.state.qid].options[0]}</button>
                    <button onClick={this.optionSelect} value={this.props.ques[this.state.qid].options[1]}>{this.props.ques[this.state.qid].options[1]}</button>
                    <button onClick={this.optionSelect} value={this.props.ques[this.state.qid].options[2]}>{this.props.ques[this.state.qid].options[2]}</button>
                    <button onClick={this.optionSelect} value={this.props.ques[this.state.qid].options[3]}>{this.props.ques[this.state.qid].options[3]}</button>
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
