import React, { Component } from 'react';
import Canvas from './Canvas';
import Chat from  './Chat';
import List from './List';
import Timer from './Timer';
import Popup from './Popup';
import io from 'socket.io-client';

let socket;
class Game extends Component {

    state = {
        currentUser: null,
        timeOut: false,
        show: false
    }

    componentDidMount(){
        this.setState({
            currentUser:this.props.currentUser
        })

        if(!socket){
            socket = io(':3002')
            socket.on('current_user', this.printWord)
            socket.emit('start', {start: true, user: this.props.currentUser})
        } 
        // this.updateTimer();
    }

  
    handleShow = () => {
        this.setState({
            show: true
        })
    }

    handleClose = () => {
        this.setState({
            show: false
        })
    }

    printWord = (data) => {
        let div = document.getElementById('current-word');

        if(div){
            div.innerText = "";  
        }

        // console.log(data.sessionEnd, data.drawer);

        if(!data.game_status && !data.sessionEnd){
            if(data.drawer && this.props.currentUser){
                if(data.drawer.id === this.props.currentUser.id){
                    div.innerText = data.word;
                }else{
                    for(let i=0;i<data.word.length;i++){
                        div.innerText += "  __  ";
                    }
                }
            }
        }else if (!data.game_status && data.sessionEnd){
            if(data.drawer){
                if(this.props.currentUser){
                    this.handleShow();
                    if(data.drawer.id === this.props.currentUser.id){
                        div.innerText = data.word;
                    }else{
                        for(let i=0;i<data.word.length;i++){
                            div.innerText += "  __  ";
                        }
                    }
                }
            }
        }else if(data.game_status){
            this.handleShow();
            console.log(data.scores)
            for(const user in data.scores){
                alert.innerHTML += ` <p>${user} : ${data.scores[user]}</p>`
            }

            setTimeout(()=>{ this.props.history.push('/student') },5000)
        }
    }

    greetings = () => {
        if (this.props.currentUser){
            return <p>game room {this.props.currentUser.lesson_id}</p>
        }else{
            return <p>game room </p>  
        }
    }
 
    render() {
        return (
            <div className="d-flex flex-column">
                <div className="game-div" id="PopupDiv">
                    {this.greetings()}
                    <Popup {...this.state} handleClose={this.handleClose}/>
                </div>
                <Timer {...this.state}/>
                <div className="d-flex flex-row">
                    <div className="game-div">
                        <List />
                    </div>
                    <div className="game-div">
                        <div id="current-word"></div>
                        <Canvas {...this.state} />
                    </div>
                    <div className="game-div">
                        <Chat {...this.state} addScore={this.addScore}/>
                    </div>
                </div>

            </div>
        )
    }
}

export default Game;