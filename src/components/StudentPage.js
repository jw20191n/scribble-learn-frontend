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
        let ul = document.getElementById('user-list');
        if(ul){
            ul.innerHTML = "";
            data.forEach(user => {
                if( user !== null ){
                    ul.innerHTML += `<li class='list-group-item'><i class="far fa-poo"></i> ${user.username}</li>`
                }
           }) 
        }
    }

    render() {
        if(this.props.currentUser){
            return (
                <div id="studentPage-Back">
                    <div id='img1'></div>
                    <div className="studentPage">
                        <h3 data-toggle="tooltip" data-placement="top" title="当前在线学生">Current Online Students</h3>
                        <ul className="list-group list-group-flush" id="user-list"></ul>
                        <NavLink to="/game" exact data-toggle="tooltip" data-placement="top" title="加入课程"><i className="fas fa-sign-in-alt"></i> join class</NavLink>
                    </div>
                    <div id='img2'></div>
                    <div id='img3'></div>
                </div>
            )
        }else{
            return (<div id="studentPage-Back">
                        <div id='img1'></div>
                        <div className="studentPage">not login yet</div>
                        <div id='img2'></div>
                        <div id='img3'></div>
                    </div>)
        }
    }
}