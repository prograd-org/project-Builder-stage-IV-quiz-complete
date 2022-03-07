import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ResultComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ans: [...this.props.sentAns],
            res: ""
        }
    }
    render() {
        return (
            <div className="resCont">
                <div className="logo"></div>
                <h2>Result</h2>
                <div className="box resC">
                    {
                        ((this.state.ans.filter((answer) => {
                            return answer === 1
                        }).length) / (this.state.ans.length) * 100) < 60 ?
                            <h2>You need more practice</h2>
                            :
                            <h2>You did good!!</h2>
                    }
                    <h1>Your Score: {
                        ((this.state.ans.filter((answer) => {
                            return answer === 1
                        }).length) / (this.state.ans.length) * 100).toFixed(2)
                    }%</h1>
                    <div className="res">
                        <div className="li"><span>Total number of questions</span><span>{this.state.ans.length}</span></div>
                        <div className="li"><span>Number of attempted questions</span><span>{
                            this.state.ans.filter((answer) => {
                                return answer !== 0
                            }).length
                        }</span></div>
                        <div className="li"><span>Number of Correct Answers</span><span>{
                            this.state.ans.filter((answer) => {
                                return answer === 1
                            }).length
                        }</span></div>
                        <div className="li"><span>Number of Wrong Answers</span><span>{
                            this.state.ans.filter((answer) => {
                                return answer === -1
                            }).length
                        }</span></div>
                    </div>
                </div>
                <div className="btns"><Link to="/quiz">Play Again</Link><Link to="/">Back to Home</Link></div>
            </div>
        )
    }
}