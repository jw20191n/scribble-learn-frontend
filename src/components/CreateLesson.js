import React, { Component } from 'react';

export default class CreateLesson extends Component {
    state={
        name: ""
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if(this.props.currentUser){
            fetch('http://localhost:3001/lessons',{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: this.state.name,
                    admin_id: this.props.currentUser.id
                })
            }).then(resp => resp.json())
            .then(data => {
                console.log(data);
                this.props.history.push('/admin');
                alert('you successfully created the class!')
            })
        }
    }

    render() {
        return (
            <div className="create-lesson"> 
                <form className="auth-form" onSubmit={this.handleSubmit}>
                    <ul className="form-ul">
                        <li>
                            <label>Class Name</label>
                            <input type="text" name="name" placeholder="class name" onChange={this.handleChange} value={this.state.name}/>
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
