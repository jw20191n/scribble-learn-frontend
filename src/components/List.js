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
        let ul = document.getElementById('user-list');
        if(ul){
            ul.innerHTML = "";
            data.forEach(user => {
                if( user !== null ){
                    ul.innerHTML += `<li class="list-group-item"><i class="far fa-poo"></i>${user.username}</li>`
                }
           }) 
        }
    }


 
    render() {
        return (
            <div className="game-div">
                In Room
                <ul className="list-group" id="user-list">
                </ul>
            </div>
        )
    }
}
