import React, { Component } from 'react';
import Canvas from './Canvas';
import Toolbar from './Toolbar';
import Chat from  './Chat';
import io from 'socket.io-client';

let socket;

// import P5Wrapper from 'react-p5-wrapper';
// import withUnmounted from '@ishawnwang/withunmounted';

class Game extends Component {

    // hasUnmounted = false;

    state = {
        currentUser: null,
        users: [],
        color: "black",
        size: 10,
        host: 1,
        words: ["apple", "pear", "banana"],
        clear: false
    }

    componentDidMount(){
        this.setState({
            currentUser:this.props.currentUser,
            users: [...this.state.users, this.props.currentUser]
        })

        if(!socket){
            socket = io(':3002')
            socket.on('adduser', this.addUser)
        } 

        let data = {
            user: this.props.currentUser
         }
         socket.emit('adduser', data);
         
    }

    componentDidUpdate(){
        this.printUserList();
    }

    addUser = (data) => {
        this.setState({
            users: [...this.state.users, data.user]
        })
    }

    printUserList = () => {
        let div = document.getElementById('user-list');
        div.innerHTML = '';
        console.log(this.state.users);
        
        this.state.users.forEach(user=>{
            if( user === null ){
                div.innerHTML += `<p>noname</p>`
            }else{
                div.innerHTML += `<p>${user.username}</p>`
            }
        })

    }

    greetings = () => {
        if (this.props.currentUser){
            return <p>game room {this.props.currentUser.lesson_id}</p>
        }else{
            return <p>game room </p>  
        }
    }

    changeColor = (drawingColor) =>{
        this.setState({
            color: drawingColor
        })
        // console.log(this.state.color)
    }

    changeWidth = (newSize) => {
        this.setState({
            size: newSize
        })
    }

    reset = () => {
        // const canvas = document.getElementById('canvas');
        // const c = canvas.getContext('2d');
        // c.clearRect(0,0, canvas.width, canvas.height);
        this.setState({
            clear: true
        })
        console.log(this.state.clear)
    }
 
    render() {
        return (
            <div className="d-flex flex-column">
                <div className="game-div">{this.greetings()}</div>
                <div className="d-flex flex-row">
                    <div className="game-div">
                        Student List
                        <div id="user-list"></div>
                    </div>
                    <div className="game-div">
                        <Canvas {...this.state} />
                        <Toolbar changeColor={this.changeColor} changeWidth={this.changeWidth} reset={this.reset}/>
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