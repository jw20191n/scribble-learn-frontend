import React, { Component } from 'react';
import io from 'socket.io-client';
import { NavLink } from 'react-router-dom';

let socket;

export default class StudentPage extends Component {
    

    componentDidMount(){
        if(!socket){
            socket = io(':3002');
            socket.on('print_user', this.addUser);
        }

        if(this.props.currentUser){
            let data = {
                user: this.props.currentUser
            }
            socket.emit('print_user', data); 
        }
    }

    addUser = (data) => {
        let div = document.getElementById('student-list');
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
        if(this.props.currentUser){
            return (
                <div >
                    <h1>Welcome, {this.props.currentUser.username}!</h1>
                    <div id="student-list"></div>
                    <NavLink to="/game" exact>start game</NavLink>
                </div>
            )
        }else{
            return (<div >not login yet</div>)
        }
    }
}