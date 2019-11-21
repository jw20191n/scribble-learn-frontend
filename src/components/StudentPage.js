import React, { Component } from 'react';


export default class StudentPage extends Component {
    
    state = { 
        lesson_id: 0
    }

    componentDidMount(){
        if(this.props.currentUser){
            this.setState({
                lesson_id: this.props.currentUser.lesson_id
            })
        }
    }

    handleChange = (event) => {
        this.setState({
            lesson_id: parseInt(event.target.value)
        })
        // console.log(this.state.code)
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if(this.props.currentUser){
            fetch(`http://localhost:3001/students/${this.props.currentUser.id}`,{
                method: "PATCH",
                headers:{
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    lesson_id: parseInt(this.state.lesson_id)
                })
            }).then(resp=>resp.json())
            .then(data=> {
                // console.log(data);
                // console.log(this.props.currentUser)
                // this.props.setCurrentUser(data);
            })
            // this.getWords();
            this.props.history.push('/game');
        }
    }

    // getWords = () => {
    //     fetch('http://localhost:3001/words')
    //     .then(resp=>resp.json())
    //     .then(data=> {
    //         let wordsArray = data.filter(word => word.lesson_id === this.state.id);
    //         this.props.setWordState(wordsArray);
    //     })
    // }

    render() {
        if(this.props.currentUser){
            return (
                <div >
                    <h1>Welcome, {this.props.currentUser.username}!</h1>
                    <form className="edit-student" onSubmit={this.handleSubmit}>
                        <ul className="form-ul">
                            <li>
                                <label>enter lesson code</label>
                                <input type="number" name="lesson_id" placeholder="enter lesson id" onChange={this.handleChange} value={this.state.lesson_id}/>
                            </li>
                            <li>
                                <input type="submit" value="submit" className="submit-btn" />
                            </li>
                        </ul>
                    </form>
                </div>
            )
        }else{
            return (<div >not login yet</div>)
        }
    }
}