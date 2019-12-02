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

        if(data.seconds === 29){
           this.startAnimation(); 
        }

        if(data.seconds === 0 ){
            let svg = document.querySelector('svg');
            svg.innerHTML = "";
        }
    }

    startAnimation = () => {
        let svg = document.querySelector('svg');
        svg.innerHTML = "";
        svg.innerHTML += "<circle class='run-animation' r='18' cx='20' cy='20'></circle>"
    }

    render() {
        return (
            <div className="game-div">
                <div id="countdown">
                    <div id="countdown-number"></div>
                    <svg>
                        
                    </svg>
                </div>
            </div>
        )
    }
}
