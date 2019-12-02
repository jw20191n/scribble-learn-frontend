import React, { Component } from 'react';
import io from 'socket.io-client';

let socket;

export default class List extends Component {

    componentDidMount(){

        if(!socket){
            socket = io(':3002')
            socket.on('print_user', this.addUser)
            socket.on('chat', this.changeColor)
        } 
    }


    addUser = (data) => {
        let ul = document.getElementById('user-list');
        if(ul){
            ul.innerHTML = "";
            data.forEach(user => {
                if( user !== null ){
                    ul.innerHTML += `<li class="list-group-item list" id=${user.username}><i class="far fa-poo"></i>${user.username}</li>`
                }
           }) 
        }
    }

    changeColor = (data) => {
        let ul = document.getElementById('user-list');

        if(data.msg === "guessed it right" ){
            for(let i=0; i<ul.childNodes.length; i++){
                if(ul.childNodes[i].id === data.user.username){
                    ul.childNodes[i].style = "background:greenyellow";
                }
            }
        }

        if(data.sessionEnd){
            for(let i=0; i<ul.childNodes.length; i++){
                ul.childNodes[i].style = "background:white";        
            } 
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
