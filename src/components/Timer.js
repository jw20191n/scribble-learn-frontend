import React, { Component } from 'react';
import io from 'socket.io-client';

let socket;

export default class Timer extends Component {

    componentDidMount(){

        if(!socket){
            socket = io(':3002')
            // socket.on('print_timer', this.printTimer)
        } 
    }

    // addUser = (data) => {
    //     let div = document.getElementById('timer');
    //     div.innerHTML = data;
    // }

    render() {
        return (
            <div className="game-div">
                <div id="timer">
                </div>
            </div>
        )
    }
}
