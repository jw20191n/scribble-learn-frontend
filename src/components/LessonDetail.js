import React, { Component } from 'react';

export default class LessonDetail extends Component {

    state={
        words:[]
    }

    componentDidMount(){
        this.getWords()
    }

    componentDidUpdate(){
        // console.log(this.state.words)
        this.printWords()
    }

    getWords = () => {
        fetch('http://localhost:3001/words')
        .then(resp=>resp.json())
        .then(data=> {
            let wordsArray = data.filter(word => word.lesson_id === this.props.id);
            this.setState({
                words: wordsArray
            })
        })
    }

    printWords = () => {
        let div=document.getElementById(this.props.id);
        console.log(this.props.id, this.state.words);

        if(this.state.words.length>0){
            // console.log(this.props.id, this.state.words);
         
            this.state.words.forEach(word=>{
                div.innerText += word.text;
            })
        }
    }
    

    render() {
 
        return(
            <div className="lesson-info" id={this.props.id}>Words: </div>
        )
    }
}






