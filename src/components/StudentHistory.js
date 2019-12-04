import React, { Component } from 'react';
// import io from 'socket.io-client';

// let socket;

export default class StudentHistory extends Component {
    
    state={
        words: [],
        right: [],
        wrong: []
    }

    componentDidMount(){
        this.fetchLessonWords();
    }

    componentDidUpdate(){
        // console.log(this.state.words);
        console.log(this.state.right, this.state.wrong);
    }

    fetchLessonWords = () => {
        if(this.props.currentUser){
            fetch('http://localhost:3001/words')
            .then(resp => resp.json())
            .then(data => {
                let wordsArray = data.filter(word => word.lesson_id === this.props.currentUser.lesson_id)
                this.setState({
                    words: wordsArray
                })
                this.fetchGuessedWords();
            })
        } 
    }

    fetchGuessedWords = () => {

        fetch('http://localhost:3001/guessrights')
        .then(resp => resp.json())
        .then(data => {
            let rightWords = data.filter(word => word.student_id === this.props.currentUser.id);
            rightWords = rightWords.filter(word => word.lesson_id === this.props.currentUser.lesson_id);
            let right = [];
            rightWords.forEach(wordObj=>{
                this.state.words.forEach(word=>{
                    if(wordObj.id === word.id){
                        right.push(word.text);
                    }
                })   
            })
            let allWords = this.state.words.map(word => word.text);
            console.log('all', allWords);
            let wrongWords = [];
            allWords.forEach(word=>{
                if(!right.includes(word)){
                    wrongWords.push(word);
                }
            })
            this.setState({
                right: right,
                wrong: wrongWords
            })
        })
        
    }

    printWrongWords = () => {
        let div = document.getElementsByClassName('history-inner')[0];
        this.state.wrongWords.forEach(word => {
            div.innerText += `<p>${word}</p>`
        })  
    }

    render() {
        return( 
            <div className="std-history">
                Study List:
                <div className="history-inner">
                </div>
            </div>
        )

    }
}