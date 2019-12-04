import React, { Component } from 'react';

export default class LessonDetail extends Component {

    state={
        words:[],
        word: ""
    }

    componentDidMount(){
        this.getWords();
    }

    componentDidUpdate(){
        this.printWords();
    }


    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    getWords = () => {
        fetch('http://localhost:3001/words')
        .then(resp => resp.json())
        .then(data => {
            let wordsArray = data.filter(word => word.lesson_id === this.props.id);
            this.setState({
                words: wordsArray
            })
        })
    }

    printWords = () => {
        let div = document.getElementById(this.props.id);
        // console.log(this.props.id, this.state.words);
        div.innerHTML = "";

        if(this.state.words.length>0){
            // console.log(this.props.id, this.state.words);
            this.state.words.forEach(word=>{
                div.innerText += `"${word.text}", `;
            })
        }
    }

    addWord = (event) => {
        event.preventDefault();
        fetch('http://localhost:3001/words',{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                text: this.state.word,
                lesson_id: this.props.id
            })
        }).then(resp => resp.json())
        .then(data => {
            console.log(data);
            this.setState({
                words: [...this.state.words, data],
                word: ""
            })
        })
    }
    
    render() {

        return(
            <div>
                <div>Words:
                    <div className="lesson-info" id={this.props.id}></div>
                </div>
                <form className="auth-form" onSubmit={this.addWord}>
                    <div className="form-group">
                        <label>add word to class</label>
                        <input type="text" name="word" className="form-control" placeholder="please type in word you want to add" onChange={this.handleChange} value={this.state.word}/>
                    </div>
                    <button type="submit" value="submit" className="btn btn-primary" >Submit</button>
                </form>
            </div>
        )
    }
}






