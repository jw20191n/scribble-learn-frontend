import React, { Component } from 'react';
import io from 'socket.io-client';

let socket;

class Canvas extends Component {

    color = "black";
    size = "10";
    drawing = false;

    state = {
        sessionEnd: false
    }

    componentDidMount(){
        this.initiateCanvas();

        if(!socket){
            socket = io(':3002')
            socket.on('draw_line', this.newDrawing)
            socket.on('current_user', this.setDrawer);
            // socket.on('chat', this.checkSession);
        } 
    }

    componentDidUpdate(){
        // console.log('canvas updated')
        if(this.state.sessionEnd){
            const canvas = document.getElementById('canvas');
            const c = canvas.getContext('2d');
            c.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    setDrawer = (data) => {

        if(data.drawer && this.props.currentUser){
            if (data.drawer.id === this.props.currentUser.id){
                this.drawing = true;
            }else{
                this.drawing = false;
            }
        }

        if(data.sessionEnd){
            const canvas = document.getElementById('canvas');
            if(canvas){
                const c = canvas.getContext('2d');
                c.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
        // socket.emit('restart_session', { sessionEnd: false });
    }

    newDrawing = (data) => {
        const canvas = document.getElementById('canvas');
        const c = canvas.getContext('2d');
        c.lineJoin = 'round';
        c.lineCap = 'round';
        let line = data.line;
        c.beginPath();
        c.strokeStyle = line[2];
        c.lineWidth = line[3];
        c.moveTo(line[0].x, line[0].y);
        c.lineTo(line[1].x, line[1].y);
        c.stroke();
    }

    changeColor = (color) => {
        this.color = color
    }

    changeWidth = (size) => {
        this.size = parseInt(size);
    }
    
    initiateCanvas = () => {
        const canvas = this.refs.canvas;
        canvas.width = window.innerWidth*0.6;
        canvas.height = window.innerHeight*0.6;
        const c = canvas.getContext('2d');
        c.lineJoin = 'round';
        c.lineCap = 'round';

        let mouse = { 
            click: false,
            move: false,
            pos: {x:0, y:0},
            pos_prev: false,
        };

        // console.log(this.color, this.size);

        const mainLoop = () => {
            if(!this.drawing){
                mouse.click = false;
            }
            
            if (mouse.click && mouse.move && mouse.pos_prev) {
                socket.emit('draw_line', { line: [ mouse.pos, mouse.pos_prev, this.color, this.size] });
                mouse.move = false;
            }
            mouse.pos_prev = {x: mouse.pos.x, y: mouse.pos.y};
            setTimeout(mainLoop, 25);
         }
        mainLoop();
        
        //event listeners
        canvas.addEventListener('mousedown', (e) => {
            mouse.click = true;
        });

        canvas.addEventListener('mousemove', (e)=>{
            mouse.pos.x = e.offsetX;
            mouse.pos.y = e.offsetY;
            mouse.move = true;
        });

        canvas.addEventListener('mouseup', () => mouse.click = false);
        canvas.addEventListener('mouseout', () => mouse.click = false);
    }

    render() {
        return (
            <div className="canvasDiv">
                <canvas ref="canvas" id="canvas"></canvas>
                <div className="toolDiv">
                    <i className="far fa-palette fa-lg"></i> Color
                    <button className="tool-btn btn btn-light" onClick={()=>this.changeColor('yellow')}><span  style={{color: 'yellow'}}><i className="fas fa-circle fa-lg"></i></span></button>
                    <button className="tool-btn btn btn-light" onClick={()=>this.changeColor('green')}><span  style={{color: 'green'}}><i className="fas fa-circle fa-lg"></i></span></button>
                    <button className="tool-btn btn btn-light" onClick={()=>this.changeColor('hotpink')}><span  style={{color: 'hotpink'}}><i className="fas fa-circle fa-lg"></i></span></button>
                    <button className="tool-btn btn btn-light" onClick={()=>this.changeColor('red')}><span  style={{color: 'red'}}><i className="fas fa-circle fa-lg"></i></span></button>
                    <button className="tool-btn btn btn-light" onClick={()=>this.changeColor('orange')}><span  style={{color: 'orange'}}><i className="fas fa-circle fa-lg"></i></span></button>
                    <button className="tool-btn btn btn-light" onClick={()=>this.changeColor('LightSkyBlue')}><span  style={{color: 'LightSkyBlue'}}><i className="fas fa-circle fa-lg"></i></span></button>
                    <button className="tool-btn btn btn-light" onClick={()=>this.changeColor('blue')}><span  style={{color: 'blue'}}><i className="fas fa-circle fa-lg"></i></span></button>
                    <button className="tool-btn btn btn-light" onClick={()=>this.changeColor('brown')}><span  style={{color: 'brown'}}><i className="fas fa-circle fa-lg"></i></span></button>
                    <button className="tool-btn btn btn-light" onClick={()=>this.changeColor('black')}><span  style={{color: 'black'}}><i className="fas fa-circle fa-lg"></i></span></button>
                    <button className="tool-btn btn btn-light" onClick={()=>this.changeColor('grey')}><span  style={{color: 'grey'}}><i className="fas fa-circle fa-lg"></i></span></button>
                </div>
                <div className="toolDiv">
                    <i className="fad fa-pencil-alt fa-lg"></i>fill style
                    <button className="tool-btn btn btn-light" onClick={()=>this.changeWidth(20)}><i className="fad fa-circle fa-2x"></i>Thick</button>
                    <button className="tool-btn btn btn-light" onClick={()=>this.changeWidth(10)}><i className="fad fa-circle fa-lg"></i>Normal</button>
                    <button className="tool-btn btn btn-light" onClick={()=>this.changeWidth(3)}><i className="fad fa-circle fa-sm"></i>Thin</button>
                </div>
                <div className="toolDiv">
                    Eraser
                    <button className="color-tool btn btn-light" onClick={()=>this.changeColor('white')}><i className="fad fa-eraser fa-lg"></i></button>
                </div>
            </div>
            
        )
    }
}

export default Canvas;