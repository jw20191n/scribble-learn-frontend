import React, { Component } from 'react';

export default class CreateLesson extends Component {
    state={
        name: "", 
        passcode: "",
        description: ""
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        // if(this.props.currentUser){
        //     fetch('http://localhost:3001/lessons',{
        //         method: "POST",
        //         headers:{
        //             "Content-Type": "application/json",
        //             "Accept": "application/json"
        //         },
        //         body: JSON.stringify({
        //             name: this.state.name,
        //             passcode: this.state.passcode,
        //             description: this.state.description,
        //             admin_id: this.props.currentUser.id,
        //         })
        //     }).then(resp => resp.json())
        //     .then(data => {
        //         console.log(data);
        //         this.props.history.push('/admin');
        //         alert('you successfully created the class!')
        //     })
        // }
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
                            <label>Passcode</label>
                            <input type="text" name="passcode" placeholder="class passcode" onChange={this.handleChange} value={this.state.passcode}/>
                        </li>
                        <li>
                            <label>Class Description</label>
                            <input type="text" name="description" placeholder="class description" onChange={this.handleChange} value={this.state.description}/>
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
