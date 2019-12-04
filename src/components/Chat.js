import React, { Component } from 'react';
import io from 'socket.io-client';

let socket;

export default class Chat extends Component {

    state = {
        msg: ""
    }

    drawing = false;

    componentDidMount(){
        if(!socket){
            socket = io(':3002');
            socket.on('chat', this.printChat);
            socket.on('current_user', this.setDrawer);
            socket.on('guessright', this.sendGuessright);
        } 
    }

    componentDidUpdate(){
        // console.log()
    }

    handleChange = (event) => {
        this.setState({
            msg: event.target.value
        }) 
    }

    setDrawer = (data) => {
        if(data.drawer && this.props.currentUser){
            if (data.drawer.id === this.props.currentUser.id){
                this.drawing = true;
            }else{
                this.drawing = false;
            }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if(!this.drawing){
            let data = {
                msg: this.state.msg,
                user: this.props.currentUser
             }
             socket.emit('chat', data);
     
             this.setState({
                 msg: ""
             })
        }else{
            alert("You are drawing!!can't talk!!")
        }

        
    }

    printChat = (data) => {
        let div = document.getElementById("chatInfo");
        if(div){
            if(data.sessionEnd){
                div.innerHTML = "";
                
            }else{
                if(data.user){
                    if(data.msg === "guessed it right"){
                        div.innerHTML += `<p class="green chatMsg">${data.user.username}: ${data.msg}</p>`
                    }else{
                        div.innerHTML += `<p class="chatMsg">${data.user.username}: ${data.msg}</p>`
                    }
                }else{
                    div.innerHTML += `<p>noname: ${data.msg}</p>`
                }   
            }          
        }   
    }


    sendGuessright = (data) => {

        if(data.user === this.props.currentUser){
            let foundWord = {};
        
            fetch('http://localhost:3001/words')
            .then(resp => resp.json())
            .then(resp => {
                foundWord = resp.find(obj => obj.text === data.word )
                // console.log(foundWord.text);
                fetch('http://localhost:3001/guessrights',{
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        student_id: data.user.id,
                        word_id: foundWord.id,
                        lesson_id: 1
                    })
                }).then(resp => resp.json())
                .then(data => console.log(data))
            })
        }   
    }
    
    render() {
        return (
            <div className="chat">
                <span id="msgHistory">Message History</span>
                <div id="chatInfo"></div>
                <form className="chatForm" onSubmit={this.handleSubmit}>
                    <input type="text" name="msg" placeholder="type answer here" onChange={this.handleChange} value={this.state.msg}/>
                    <button type="submit" value="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}