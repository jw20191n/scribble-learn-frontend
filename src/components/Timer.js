import React, { Component } from 'react';
import io from 'socket.io-client';

let socket;

export default class Timer extends Component {

    componentDidMount(){

        if(!socket){
            socket = io(':3002')
            socket.on('time_left', this.getTimeLeft);
        } 
    }

    getTimeLeft = (data) => {
        let countdownNumber = document.getElementById('countdown-number');

        if(countdownNumber && this.props.currentUser){
            countdownNumber.textContent = data.seconds;
        }
    }

    // printCircle = (data) => {
    //     let circle = document.querySelector('circle');
    //     if(data.seconds === 30){
    //         circle.style.animation = "countdown 30s linear infinite forwards";
    //     }
    // }

    render() {
        return (
            <div className="game-div">
                <div id="countdown">
                    <div id="countdown-number"></div>
                    <svg>
                        <circle r="18" cx="20" cy="20"></circle>
                    </svg>
                </div>
            </div>
        )
    }
}
