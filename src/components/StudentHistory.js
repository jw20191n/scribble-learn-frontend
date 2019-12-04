import React, { Component } from 'react';
// import io from 'socket.io-client';

// let socket;

export default class StudentHistory extends Component {
    
    state={
        words: [],
        drawed: [],
        right: [],
        wrong: []
    }

    componentDidMount(){
        this.fetchLessonWords();
        // console.log(this.props.currentUser)
    }

    componentDidUpdate(){
        console.log("words state", this.state.words);
        console.log("right-->", this.state.right);
        console.log("wrong-->", this.state.wrong);
        console.log("drawed-->", this.state.drawed);
        this.printWrongWords();
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
            // console.log(data);
            let lessonGuessedWords = data.filter(word => word.lesson_id === this.props.currentUser.lesson_id);
            let rightWords = lessonGuessedWords.filter(word => word.student_id === this.props.currentUser.id && word.student_id !== word.drawer_id);
            // rightWords = rightWords.filter(word => word.lesson_id === this.props.currentUser.lesson_id);
            console.log("rightWords--->", rightWords);

            let right = [];
            let wrongWords = [];
            let drawedWords = [];

            rightWords.forEach(wordObj=>{
                this.state.words.forEach(word=>{
                    if(wordObj.word_id === word.id){
                        if(!right.includes(word.text)){
                            right.push(word.text);
                        }
                    }
                })   
            })
            console.log("right", right);

            let allWords = this.state.words.map(word => word.text);
            let drawed = lessonGuessedWords.filter(word => word.drawer_id === this.props.currentUser.id);
            drawed.forEach(wordObj=>{
                this.state.words.forEach(word=>{
                    if(wordObj.word_id === word.id){
                        if(!drawedWords.includes(word.text)){
                            drawedWords.push(word.text);
                        }
                        if(wordObj.student_id === wordObj.drawer_id){
                            wrongWords.push(word.text);
                        }
                    }
                })   
            })
            console.log('drawed', drawedWords);

            allWords.forEach(word=>{
                if(!right.includes(word) && !drawedWords.includes(word)){
                    wrongWords.push(word);
                }
            })
            this.setState({
                right: right,
                wrong: wrongWords,
                drawed: drawedWords 
            })
        })
        
    }

    printWrongWords = () => {
        let div = document.getElementsByClassName('history-inner')[1];
        let drawedDiv = document.getElementsByClassName('history-inner')[0];
        div.innerHTML = "";
        drawedDiv.innerHTML = "";

        if(this.state.wrong.length === 0 ){
            div.innerHTML += `<p>Good job!!!! You got all the words</p>`
        }else{
            this.state.wrong.forEach(word => {
                div.innerHTML += `<p>${word}</p>`
            })  
        }

        this.state.drawed.forEach(word => {
            drawedDiv.innerHTML += `<p>${word}</p>`
        })
    }

    render() {
        return( 
            <div className="std-history">
                You drew:
                <div className="history-inner"></div>
                Study List:
                <div className="history-inner"></div>
            </div>
        )

    }
}