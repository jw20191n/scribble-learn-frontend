import React, { Component } from 'react';

export default class SignUp extends Component {
    state={
        username: "", 
        password: "",
        passwordConfirmation: "",
        type: "admin"
    }

    handleChange = (event) => {
        if(event.target.type==="text"){
            this.setState({
                [event.target.name]:event.target.value
            })
        }else{
            this.setState({
                type:event.target.value
            })
        }
        // console.log(this.state)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.password === this.state.passwordConfirmation){
            if(this.state.type === "student"){
                fetch('http://localhost:3001/students',{
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        username: this.state.username,
                        password: this.state.passwordConfirmation,
                        lesson_id: 1
                    })
                }).then(resp=>resp.json())
                .then(data=> {
                    console.log(data);
                    this.props.setCurrentUser(data)
                    this.props.history.push('/student')
                })
            }else{
                fetch('http://localhost:3001/admins',{
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        username: this.state.username,
                        password: this.state.passwordConfirmation
                    })
                }).then(resp=>resp.json())
                .then(data=> {
                    console.log(data);
                    this.props.setCurrentUser(data)
                    this.props.history.push('/admin')
                })
            }
            
        }else{
            alert('wrong!')
        }
   
    }
    
    render() {
        return (
            <div className="bgDiv">
                <div className="signup"> 
                    <h3 className="formTitle">Sign Up</h3> 
                    <form className="auth-form" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" name="username" className="form-control" placeholder="Username" onChange={this.handleChange} value={this.state.username}/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="text" name="password" className="form-control" placeholder="Password" onChange={this.handleChange} value={this.state.password}/>
                        </div>
                        <div className="form-group">  
                            <label>Password Confirmation</label>
                            <input type="text" name="passwordConfirmation" className="form-control" placeholder="Password Confirmation" onChange={this.handleChange} value={this.state.passwordConfirmation}/>
                        </div>
                        <div className="form-group">
                            <select name="type" onChange={this.handleChange}>
                                <option value="admin">Admin</option>
                                <option value="student">Student</option>
                            </select>
                        </div>
                        <button type="submit" value="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}
