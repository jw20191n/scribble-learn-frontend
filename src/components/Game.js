import React, { Component } from 'react';
import Canvas from './Canvas';
import Toolbar from './Toolbar';

export default class Game extends Component {
    state = {
        color: "black",
        size: 10
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
        const canvas = document.getElementById('canvas');
        const c = canvas.getContext('2d');
        c.clearRect(0,0, canvas.width, canvas.height);
    }
 
    render() {
        return (
            <div>
                {this.greetings()}
                <Canvas {...this.state}/>
                <Toolbar changeColor={this.changeColor} changeWidth={this.changeWidth} reset={this.reset}/>
            </div>
        )
    }
}