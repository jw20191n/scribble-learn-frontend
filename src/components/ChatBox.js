import React, { Component } from 'react';
import io from 'socket.io-client';

let socket;

export default class ChatBox extends Component {
    state = {
        msg: ""
    }

    componentDidMount(){
        if(!socket){
            socket = io(':3002')
            socket.on('submit', this.handleData)
        } 
    }

    handleChange = (event) => {
        this.setState({
            msg: event.target.value,
        }) 
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let data = {
           msg: this.state.msg
        }
        socket.emit('submit', data);
        console.log(data)
    }

    handleData = (data) => {
        console.log('in handleData');
        let div = document.getElementsByClassName("chatInfo")[0]
        div.innerHTML += `<p>${data.msg}</p>` 
    }
    
    render() {
        return (
            <div>
                <div className="chatInfo">whateever</div>
                <form className="chat" onSubmit={this.handleSubmit}>
                    <input type="text" name="msg" placeholder="type answer here" onChange={this.handleChange} value={this.state.msg}/>
                    <input type="submit" />
                </form>
                    
            </div>
        )
    }
}