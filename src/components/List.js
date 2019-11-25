import React, { Component } from 'react';
import io from 'socket.io-client';

let socket;

export default class List extends Component {

    componentDidMount(){

        if(!socket){
            socket = io(':3002')
            socket.on('print_user', this.addUser)
        } 
    }


    addUser = (data) => {
        let div = document.getElementById('user-list');
        if(div){
            div.innerHTML = "";
            data.forEach(user => {
                if( user !== null ){
                    div.innerHTML += `<p>${user.username}</p>`
                }
           }) 
        }
         
    }

 
    render() {
        return (
            <div className="game-div">
                Student List
                <div id="user-list">
                </div>
            </div>
        )
    }
}
