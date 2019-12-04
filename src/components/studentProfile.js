import React, { Component } from 'react';
// import io from 'socket.io-client';

// let socket;

export default class StudentProfile extends Component {
    
    state = {
        lesson_id: null
    }


    componentDidMount(){

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
                    lesson_id: this.state.lesson_id
                })
            }).then(resp=>resp.json())
            .then(data=> {
                // console.log(data);
                this.props.setCurrentUser(data);
            })
            // this.getWords();
            this.props.history.push('/student');
        }
    }

    handleChange = (event) => {
        this.setState({
            lesson_id: parseInt(event.target.value)
        }) 
    }
    
    render() {
        return( 
            <div className="std-profile">
               <form className="auth-form" onSubmit={this.handleSubmit}>
                    <ul className="form-ul">
                        <li>
                            <label>Lesson Id</label>
                            <input type="text" name="lesson_id" placeholder="lesson id" onChange={this.handleChange} value={this.state.name}/>
                        </li>
                        <li>
                            <input type="submit" value="submit" className="submit-btn" />
                        </li>
                    </ul>
                </form>
            </div>
        )

    }
}