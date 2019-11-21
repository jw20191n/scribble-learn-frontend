import React, { Component } from 'react';


export default class Canvas extends Component {

    componentDidMount(){
        this.initiateCanvas();

    }

    componentDidUpdate(){
        
    }

    initiateCanvas = () => {
        const canvas = this.refs.canvas;
        canvas.width = window.innerWidth*0.95;
        canvas.height = window.innerHeight*0.7;
        const c = canvas.getContext('2d');
        c.lineJoin = 'round';
        c.lineCap = 'round';

        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;

        let draw = (e) => {
            // stop the function if they are not mouse down
            if(isDrawing){
                // console.log(e);
                c.strokeStyle = this.props.color;
                c.lineWidth = this.props.size;
                c.beginPath();
                c.moveTo(lastX, lastY);
                c.lineTo(e.offsetX, e.offsetY);
                c.stroke();
                [lastX, lastY] = [e.offsetX, e.offsetY];
            }
          }

        canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            [lastX, lastY] = [e.offsetX, e.offsetY];
          });
        
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', () => isDrawing = false);
        canvas.addEventListener('mouseout', () => isDrawing = false);
    }

    render() {
        return (
            <div>
                <canvas ref="canvas" id="canvas"></canvas>
            </div>
        )
    }
}