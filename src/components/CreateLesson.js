import React, { Component } from 'react';

export default class CreateLesson extends Component {
    state={
        name: ""
    }

    componentDidUpdate(){
        // console.log(this.state.name)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.props.currentUser);
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
                alert('you successfully created the class!')
                this.setState({
                    name: ""
                })
                this.props.setLesson(data)
            })
        }
    }

    render() {
        return (
            <div className="create-lesson"> 
                <form className="lessonForm" onSubmit={this.handleSubmit}>
                    <label>Add Lesson:</label>
                    <input type="text" name="name" placeholder="class name" onChange={this.handleChange} value={this.state.name}/>
                    <button type="submit" value="submit" className="btn btn-primary">Add</button>
                </form>    
            </div>
        )
    }
}
