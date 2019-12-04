import React, { Component } from 'react';
// import io from 'socket.io-client';

// let socket;

export default class StudentProfile extends Component {
    
    state = {
        lesson_id: ""
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
                this.props.setCurrentUser(data);
            })
            // this.getWords();
            this.props.history.push('/student');
        }
    }

    handleChange = (event) => {
        this.setState({
            lesson_id: event.target.value
        }) 
    }
    
    render() {
        return( 
            <div className="std-profile">
                <div id="snow"> 
                    <form className="codeForm" onSubmit={this.handleSubmit}>
                        <label className="profile-label">Please type the secret code to join class</label>
                        <input type="text" name="lesson_id" placeholder="Secret Code" onChange={this.handleChange} value={this.state.lesson_id}/>
                        <button type="submit" value="submit" className="btn btn-primary">Join</button>
                    </form>  
                    <div id='img4'></div>
                </div>
            </div>
        )

    }
}