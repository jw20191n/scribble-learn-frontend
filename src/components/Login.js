import React, { Component } from 'react';


export default class Login extends Component {
    
    state = { 
        username: "",
        password: "",
        type: "student"
    }

    componentDidMount(){
        this.props.signOut()
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
    }

    handleSubmit = (event) =>  { 
       event.preventDefault(); 
       if(this.state.type === "student"){
        fetch('http://localhost:3001/students')
        .then(resp => resp.json())
        .then(data => this.findUser(data))
       }else{
        fetch('http://localhost:3001/admins')
        .then(resp => resp.json())
        .then(data => this.findUser(data))
       }
    }

    findUser = (users) => { 
       let foundUser = users.find(user => user.username === this.state.username )
       if (foundUser) {
        //    console.log(foundUser)
        //     console.log(this.state.type)
            this.props.setCurrentUser(foundUser)
                if(this.state.type === "student"){
                    this.props.history.push('/student')
                }else if (this.state.type === "admin"){
                    this.props.history.push('/admin')
                }
       } else { 
           alert('password or username wrong! please try again.')
       }
    }

    render() {
        return (
            <div className="bgDiv">
                <div className="login"> 
                    <h3 className="formTitle">Login</h3> 
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
                            <select name="type" onChange={this.handleChange}>
                                <option value="student">Student</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>            
                        <button type="submit" value="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}
