import React, { Component } from 'react';
import io from 'socket.io-client';

let socket;

export default class Chat extends Component {
    state = {
        msg: ""
    }

    componentDidMount(){
        if(!socket){
            socket = io(':3002');
            socket.on('chat', this.printChat);
        } 
    }

    handleChange = (event) => {
        this.setState({
            msg: event.target.value
        }) 
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let data = {
           msg: this.state.msg,
           user: this.props.currentUser
        }
        socket.emit('chat', data);

        this.setState({
            msg: ""
        })
    }

    printChat = (data) => {
        let div = document.getElementsByClassName("chatInfo")[0]
        if(data.user){
            div.innerHTML += `<p>${data.user.username}: ${data.msg}</p>`
        }else{
            div.innerHTML += `<p>noname: ${data.msg}</p>`
        }
    }
    
    render() {
        return (
            <div>
                <div className="chatInfo">Message History</div>
                <form className="chatForm" onSubmit={this.handleSubmit}>
                    <input type="text" name="msg" placeholder="type answer here" onChange={this.handleChange} value={this.state.msg}/>
                    <input type="submit" />
                </form>
            </div>
        )
    }
}