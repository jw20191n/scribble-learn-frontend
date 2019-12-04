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
        words: []
    }

    componentDidMount(){
        // console.log(this.props);

        this.setState({
            currentUser:this.props.currentUser
        })

        if(!socket){
            socket = io(':3002')
            socket.on('current_user', this.printWord)
            socket.emit('start', { user: this.props.currentUser, dummie: this.props.dummie })
        } 
    }


    //print out current word if the user is guessing, replace word with underscore
    printWord = (data) => {
        let div = document.getElementById('current-word');

        if(div){
            div.innerText = "";  
        }

        if(this.props.currentUser && data.drawer){

            //game session not ending yet, no popups
            if(!data.game_status && !data.sessionEnd){
                socket.emit('popup', {popup: false});
                if(data.drawer.id === this.props.currentUser.id){
                    div.innerText = data.word;
                }else{
                    for(let i=0;i<data.word.length;i++){
                        div.innerText += "  __  ";
                    }
                }

            //game not over but session over, popup show with new word and new round
            }else if (!data.game_status && data.sessionEnd){
                if(data.drawer.id === this.props.currentUser.id){
                    div.innerText = data.word;
                }else{
                    for(let i=0;i<data.word.length;i++){
                        div.innerText += "  __  ";
                    }
                }
            }else if(data.game_status){
                console.log('game ended');
                setTimeout(()=>{ this.props.history.push('/stdhistory') },5000)
                socket.disconnect();
            }
        }
        
    }


 
    render() {
        return (
            <div className="d-flex flex-column">
                <div className="game-div" id="PopupDiv">
                    <Popup currentUser={this.props.currentUser} />
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