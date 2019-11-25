import React, { Component } from 'react';
import Canvas from './Canvas';
import Chat from  './Chat';
import List from './List';
import Timer from './Timer';
import io from 'socket.io-client';

let socket;
class Game extends Component {

    state = {
        currentUser: null, 
        score: 0
    }

    componentDidMount(){
        this.setState({
            currentUser:this.props.currentUser,
        })

        if(!socket){
            socket = io(':3002')
            // socket.on('print_user', this.setUsers)
            socket.on('current_user', this.printWord);
        } 
    }

    componentDidUpdate(){
        console.log('game updated');
    }

    printWord = (data) => {
        let div = document.getElementById('current-word');
        div.innerText = "";

        // console.log("session", data.sessionEnd);
        // console.log("round", data.round);

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
                console.log(data.round);
                if(this.props.currentUser){
                    if(data.drawer.id === this.props.currentUser.id){
                        alert("Round " + data.round + "!  ");
                        alert("You are drawing '" + data.word + "'");
                        div.innerText = data.word;
                    }else{
                        alert("Round " + data.round + "!  " + data.drawer.username + " is drawing");
                        for(let i=0;i<data.word.length;i++){
                            div.innerText += "  __  ";
                        }
                    }
                }
            }
        }else if(data.game_status){
            alert('game is over');
            this.props.history.push('/student');
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
                <div className="game-div">{this.greetings()}</div>
                <Timer />
                <div className="d-flex flex-row">
                    <div className="game-div">
                        <List />
                    </div>
                    <div className="game-div">
                        <div id="current-word"></div>
                        <Canvas {...this.state} />
                    </div>
                    <div className="game-div">
                        <Chat {...this.state}/>
                    </div>
                </div>

            </div>
        )
    }
}

export default Game;