import React, { Component } from 'react';
import Canvas from './Canvas';
import Toolbar from './Toolbar';
import Chat from  './Chat';
import ChatBox from  './ChatBox';
// import P5Wrapper from 'react-p5-wrapper';
import withUnmounted from '@ishawnwang/withunmounted';

class Game extends Component {

    hasUnmounted = false;

    state = {
        color: "black",
        size: 10,
        host: 1,
        words: ["apple", "pear", "banana"],
        clear: false
    }

    componentDidMount(){

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
            <div>
                {this.greetings()}
                <Canvas {...this.state} user={this.props.currentUser}/>
                <Toolbar changeColor={this.changeColor} changeWidth={this.changeWidth} reset={this.reset}/>
                <Chat />
                <ChatBox user={this.props.currentUser}/>
  
            </div>
        )
    }
}

export default withUnmounted(Game);