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
    addScore: null
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
      this.renderModal();
    }

    renderModal = () => {
      let title = document.getElementById('titleDiv');
      let contentDiv = document.getElementById('contentDiv');
      if(title && contentDiv){
        if(this.state.msg !== "game over"){
          //game not over

          if(this.state.round !== 1){
            //not first round
            title.innerText = `Round over`;
            contentDiv.innerHTML =  `<p>the word is ${this.state.words[this.state.round-2]}</p>`;

            for(const key in this.state.addScore){
              contentDiv.innerHTML += `<p>${key}: +${this.state.addScore[key]}</p>`
            }
          
            setTimeout(() => {
              title.innerText = `Round ${this.state.round}`;
              contentDiv.innerText = this.state.msg;
  
              setTimeout(() => {
                this.handleClose();
              }, 3000);
            }, 3000);
          }else{
            //first round 
            title.innerText = `Round ${this.state.round}`;
            contentDiv.innerText = this.state.msg;
            setTimeout(() => {
              this.handleClose();
            }, 3000);
          }          

        }else{
          //game over
          title.innerText = this.state.msg;
          contentDiv.innerHTML =  `<p>the word for last round is ${this.state.words[this.state.words.length-1]}</p>`;

          contentDiv.innerHTML += "FINAL SCORE";

            for(const key in this.state.scores){
              contentDiv.innerHTML += `<p>${key}: ${this.state.scores[key]}</p>`
            }

          // setTimeout(() => {
          //   console.log('!');

          //   contentDiv.innerHTML = "";
          //   contentDiv.innerHTML += "FINAL SCORE";

          //   for(const key in this.state.scores){
          //     contentDiv.innerHTML += `<p>${key}: ${this.state.scores[key]}</p>`
          //   }
          // }, 3000);
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


      if(data.sessionEnd){
        let addedPoints = {};

        for(const keys in this.state.scores){
          addedPoints[keys] = data.scores[keys] - this.state.scores[keys];
        }

        this.setState({
          addScore: addedPoints
        })
      }

      this.setState({
        msg: message,
        round: data.round,
        show: data.popup,
        scores: data.scores
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
