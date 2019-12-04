import React, { Component } from 'react';

export default class SignUp extends Component {
    state={
        username: "", 
        password: "",
        passwordConfirmation: "",
        type: "admin"
    }

    handleChange = (event) => {
        if(event.target.type === "text"){
            this.setState({
                [event.target.name]:event.target.value
            })
        }else{
            this.setState({
                type:event.target.value
            })
        }
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
                    this.props.history.push('/stdprofile')
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
                }).then( resp => resp.json() )
                .then( data => {
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
                    <h3 className="formTitle" data-toggle="tooltip" data-placement="top" title="注册">Sign Up</h3> 
                    <form className="auth-form" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label data-toggle="tooltip" data-placement="top" title="用户名">Username</label>
                            <input type="text" name="username" className="form-control" placeholder="Username" onChange={this.handleChange} value={this.state.username}/>
                        </div>
                        <div className="form-group">
                            <label data-toggle="tooltip" data-placement="right" title="密码">Password</label>
                            <input type="text" name="password" className="form-control" placeholder="Password" onChange={this.handleChange} value={this.state.password}/>
                        </div>
                        <div className="form-group">  
                            <label data-toggle="tooltip" data-placement="right" title="确认密码">Password Confirmation</label>
                            <input type="text" name="passwordConfirmation" className="form-control" placeholder="Password Confirmation" onChange={this.handleChange} value={this.state.passwordConfirmation}/>
                        </div>
                        <div className="form-group">
                            <select name="type" onChange={this.handleChange}>
                                <option value="admin">Admin</option>
                                <option value="student">Student</option>
                            </select>
                        </div>
                        <button type="submit" value="submit" className="btn btn-primary" data-toggle="tooltip" data-placement="right" title="提交">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}
