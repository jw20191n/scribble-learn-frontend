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
        seconds: 30,
        timeOut: false
    }

    componentDidMount(){
        this.setState({
            currentUser:this.props.currentUser
        })

        if(!socket){
            socket = io(':3002')
            socket.on('current_user', this.printWord)
            socket.emit('start', {start: true, user: this.props.currentUser})
            // socket.on('time_left', this.timeLeft)
        } 
        // this.updateTimer();
    }

    componentDidUpdate(){
   
    }

    // timeLeft = (data) => {
    //     console.log(data.seconds);
    //     this.setState({
    //         seconds: data.seconds
    //     })
    // }


    // updateTimer = () => {
    //     let timer = setInterval(() => {
    //         if (this.state.seconds > 0) { 
    //             this.setState({ 
    //                 seconds: this.state.seconds - 1
    //             }) 
    //         } else if (this.state.seconds === 0){ 
    //             clearInterval(timer)
    //             socket.emit('time_left', { timeOut: true, user: this.props.currentUser })
    //             // this.setState({ 
    //             //     timeOut: true,
    //             //     seconds: 30
    //             // })
    //         }
    //     }, 1000);
    // }

    printWord = (data) => {
        let div = document.getElementById('current-word');
        let alert = document.getElementById('alert');
        div.innerText = "";
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
                    if(data.drawer.id === this.props.currentUser.id){
                        alert.innerText = `Round ${data.round}! You are drawing ${data.word}`
                        // alert("Round " + data.round + "!  ");
                        // alert("You are drawing '" + data.word + "'");
                        div.innerText = data.word;
     
                    }else{
                        alert.innerText = `Round ${data.round}! ${data.drawer.username} is drawing.`
                        // alert("Round " + data.round + "!  " + data.drawer.username + " is drawing");
                        for(let i=0;i<data.word.length;i++){
                            div.innerText += "  __  ";
                        }
                    }
                }
            }
        }else if(data.game_status){
            alert.innerText = "Gamve Over"
            setTimeout(()=>{ this.props.history.push('/student') },3000)
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
                <div className="alert alert-primary" role="alert" id="alert">
                </div>
                <div className="game-div">
                    {this.greetings()}
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