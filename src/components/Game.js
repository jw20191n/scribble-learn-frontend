import React, { Component } from 'react';
import Canvas from './Canvas';
import Chat from  './Chat';
import List from './List';
import Timer from './Timer';
import io from 'socket.io-client';

let socket;
class Game extends Component {

    state = {
        currentUser: null
    }

    componentDidMount(){
        this.setState({
            currentUser:this.props.currentUser
        })

        if(!socket){
            socket = io(':3002')
            // socket.on('print_user', this.addUser)
        } 

        if(this.props.currentUser){
            let data = {
                user: this.props.currentUser
            }
            socket.emit('print_user', data); 
        }
    }

    // addUser = (data) => {
    //     console.log(data);
    //     let div = document.getElementById('user-list');
    //     div.innerHTML = "";
    //     data.forEach(user => {
    //         if( user !== null ){
    //             div.innerHTML += `<p>${user.username}</p>`
    //         }
    //    })  
    // }

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