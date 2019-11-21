import React, { Component } from 'react';
import io from 'socket.io-client';
import withUnmounted from '@ishawnwang/withunmounted';

let socket;

class Canvas extends Component {
    hasUnmounted = false;

    state = {
        x:0,
        y:0
    }

    componentDidMount(){
        console.log(this.props.currentUser);
        
        this.initiateCanvas();

        if(!socket){
            socket = io(':3002')
            socket.on('mouse', this.newDrawing)
        } 
    }

    componentDidUpdate(){
        // if(this.props.clear){
        //     const canvas = document.getElementById('canvas');
        //     const c = canvas.getContext('2d');
        //     c.clearRect(0,0, canvas.width, canvas.height);
        // }
    }

     newDrawing = (data) => {
        const canvas = document.getElementById('canvas');
        const c = canvas.getContext('2d');
        c.lineJoin = 'round';
        c.lineCap = 'round';
        c.beginPath();
        c.moveTo(this.state.x, this.state.y);
        c.lineTo(data.x, data.y);
        c.stroke();
        c.globalAlpha = data.value;
        c.strokeStyle = data.color;
        c.lineWidth = data.size;
        this.setState({
            x: data.x,
            y: data.y
        })

        console.log("you are listening")
    }
    

    initiateCanvas = () => {
        const canvas = this.refs.canvas;
        canvas.width = window.innerWidth*0.95;
        canvas.height = window.innerHeight*0.7;
   
        const c = canvas.getContext('2d');
        c.lineJoin = 'round';
        c.lineCap = 'round';
        let isDrawing = false;
        // let lastX = 0;
        // let lastY = 0;
        let draw = (e) => {
            // stop the function if they are not mouse down
            if(isDrawing){
                // console.log(e.offsetX)
                c.strokeStyle = this.props.color;
                c.lineWidth = this.props.size;
                c.beginPath();
                c.moveTo(this.state.x, this.state.y);
                c.lineTo(e.offsetX, e.offsetY);
                c.stroke();
                c.globalAlpha = 1.0;
                this.setState({
                    x: e.offsetX,
                    y: e.offsetY
                })
                console.log('you are drawing')
                let data = {
                    x: e.offsetX,
                    y: e.offsetY,
                    color: this.props.color,
                    size: this.props.size,
                    value: 1.0
                }
                socket.emit('mouse', data);
            }else{
                let data = {
                    // x: e.offsetX,
                    // y: e.offsetY,
                    color: this.props.color,
                    size: this.props.size,
                    value: 0.0
                }
                socket.emit('mouse', data);
            }
          }


        canvas.addEventListener('mousedown', (e) => {
            isDrawing=true
            this.setState({
                x: e.offsetX,
                y: e.offsetY
            })
        });

        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', () => isDrawing=false);
        canvas.addEventListener('mouseout', () => isDrawing=false);
    }

    render() {
        return (
            <div>
                <canvas ref="canvas" id="canvas"></canvas>
            </div>
        )
    }
}

export default withUnmounted(Canvas);