import React, { Component } from 'react';
import io from 'socket.io-client';
import Modal from 'react-bootstrap/Modal';

let socket;

export default class Popup extends Component {

  state = {
    round: 1,
    msg: "",
    scores: null
  }

    componentDidMount(){
        console.log(this.props);
        if(!socket){
            socket = io(':3002')
            socket.on('current_user', this.printModal);
        } 
      }

    componentDidUpdate(){
      let title = document.getElementById('titleDiv');
      let contentDiv = document.getElementById('contentDiv');
      if(title && contentDiv){
        if(this.state.round !== 0){
          title.innerText = `Round ${this.state.round}`;
          contentDiv.innerText = this.state.msg;
        }else{
          title.innerText = this.state.msg;
          contentDiv.innerText = "";
          for(const key in this.state.scores){
            contentDiv.innerHTML += `<p>${key}: ${this.state.scores[key]}</p>`
          }
        }
      }
    }

      printModal = (data) => {
        let message = "";
        if(!data.game_status){
          if(this.props.currentUser && data.drawer){
            if(this.props.currentUser === data.drawer){
             message = `you need to draw ${data.word}`;
            }else{
             message = `${data.drawer.username} is drawing`;
            }
          }
        }else{
         message = "game over"
        }

          this.setState({
            round: data.round,
            msg: message,
            scores: data.scores
          })
          // console.log(title, content);
    
          // if(!data.game_status){
          //   if(title && content){
          //     title.innerText = "";
          //     title.innerText += `Round ${data.round}!`
          //     if(this.props.currentUser){
          //       if(this.props.currentUser === data.drawer){
          //         content.innerText += `you need to draw ${data.word}`;
          //       }else{
          //         content.innerText +=  `${data.drawer.username} is drawing`;
          //       }
          //     }
          //   }
          // }else{
          //   if(title && content){
          //     title.innerText = "Game Over";
          //   }
          // }
          
        }
  
  
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                <div id="titleDiv"></div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div id="contentDiv"></div>
            </Modal.Body>
            <Modal.Footer>
              <button onClick={this.props.handleClose}>
                Close
              </button>
            </Modal.Footer>
          </Modal>
        )
    }
}
