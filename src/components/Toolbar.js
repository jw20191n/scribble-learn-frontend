import React, { Component } from 'react';


export default class Toolbar extends Component {

     
    render() {
        return (
            <div id="toolbar">
                <div>
                    paint color
                    <button className="color-tool" onClick={()=>this.props.changeColor('yellow')}>Yellow</button>
                    <button className="color-tool" onClick={()=>this.props.changeColor('green')}>Green</button>
                    <button className="color-tool" onClick={()=>this.props.changeColor('hotpink')}>Hot Pink</button>
                    <button className="color-tool" onClick={()=>this.props.changeColor('black')}>black</button>
                </div>
                <div>
                    fill style
                    <button className="color-tool" onClick={()=>this.props.changeWidth(20)}>Thick</button>
                    <button className="color-tool" onClick={()=>this.props.changeWidth(10)}>Normal</button>
                    <button className="color-tool" onClick={()=>this.props.changeWidth(3)}>Thin</button>
                </div>
                <div>
                    eraser
                    <button className="color-tool" onClick={()=>this.props.changeColor('white')}>Eraser</button>
                    <button className="color-tool" onClick={()=>this.props.reset()}>Clear</button>
                </div>
            </div>
        )
    }
}