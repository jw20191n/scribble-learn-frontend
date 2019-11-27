import React, { Component } from 'react';
import io from 'socket.io-client';
import Modal from 'react-bootstrap/Modal';

let socket;

export default class Popup extends Component {

  state = {
    msg: "",
    show: true,
    scores: null,
    round: 1
  }

    componentDidMount(){
      if(this.props.currentUser){
        console.log(this.props.currentUser.username);
      }
       
        if(!socket){
            socket = io(':3002')
            socket.on('current_user', this.printModal);
        } 
      }

    componentDidUpdate(){
      // console.log(this.state.show);
      let title = document.getElementById('titleDiv');
      let contentDiv = document.getElementById('contentDiv');
      if(title && contentDiv){
        if(this.state.msg !== "game over"){
          //game not over
          title.innerText = `Round ${this.state.round}`;
          contentDiv.innerText = this.state.msg;

          setTimeout(() => {
            this.handleClose();
          }, 3000);

        }else{
          //game over
          title.innerText = this.state.msg;
          contentDiv.innerText = "";
          for(const key in this.state.scores){
            contentDiv.innerHTML += `<p>${key}: ${this.state.scores[key]}</p>`
          }
        }
      }
    }


    handleClose = () => {
      socket.emit('popup', {popup: false});
      this.setState({
        show: false
      })
    }

    printModal = (data) => {
      let message = "";
      // console.log(data)

      if(!data.game_status){
        if(this.props.currentUser && data.drawer){
          if(this.props.currentUser.username === data.drawer.username){
            message = `you need to draw ${data.word}`;
          }else{
            message = `${data.drawer.username} is drawing`;
          }
        }
      }else{
        message = "game over"
      }

      // console.log(message);

      this.setState({
        msg: message,
        round: data.round,
        show: data.popup,
        scores: data.scores
      })
    }
  
  
    render() {
        return (
            <Modal show={this.state.show} onHide={this.handleClose} >
            <Modal.Header closeButton>
              <Modal.Title>
                <div id="titleDiv"></div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div id="contentDiv"></div>
            </Modal.Body>
            <Modal.Footer>
              <button onClick={this.handleClose}>
                Close
              </button>
            </Modal.Footer>
          </Modal>
        )
    }
}
