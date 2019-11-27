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
        let div = document.getElementById('timer');
        if(div && this.props.currentUser){
            div.innerText = data.seconds;
        }
    }

    render() {
        return (
            <div className="game-div">
                <div id="timer">
                    
                </div>
            </div>
        )
    }
}
