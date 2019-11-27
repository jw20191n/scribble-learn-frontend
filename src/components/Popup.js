import React, { Component } from 'react';
import io from 'socket.io-client';
import Modal from 'react-bootstrap/Modal';

let socket;

export default class Popup extends Component {

  state = {
    msg: "",
    show: true,
    scores: null,
    round: 1,
    words:[],
    scoreAdded: null
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
          if(this.state.round !== 1){
            contentDiv.innerHTML +=  `<p>the word for last round is ${this.state.words[this.state.round-2]}</p>`;
            for(const key in this.state.scoreAdded){
              contentDiv.innerHTML += `<p>${key}: + ${this.state.scoreAdded[key]}</p>`
            }
          }
          // console.log('words:', this.state.words, 'round:', this.state.round);
          setTimeout(() => {
            this.handleClose();
          }, 3000);

        }else{
          //game over
          title.innerText = this.state.msg;
          contentDiv.innerText = "";
          contentDiv.innerHTML +=  `<p>the word for last round is ${this.state.words[this.state.words.length-1]}</p>`;
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
      // console.log(data.scores)

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

      this.setState({
        msg: message,
        round: data.round,
        show: data.popup,
        scores: data.scores,
        scoreAdded: data.scoreAdded
      })

      if(!this.state.words.includes(data.word)){
        this.setState({
          words: [...this.state.words, data.word]
        })
      }
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
