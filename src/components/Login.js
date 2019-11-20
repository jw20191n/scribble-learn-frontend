import React, { Component } from 'react';


export default class Login extends Component {
    
    state = { 
        username: "",
        password: "",
        type: "admin"
    }

    componentDidMount(){
        // this.props.signOut()
    }

    handleChange = (event) => {
        let target = event.target;
        this.setState({
            [target.name]:target.value
        })
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
            this.props.setCurrentUser(foundUser)
                if(this.state.type === "stduent"){
                    this.props.history.push('/student')
                }else{
                    this.props.history.push('/admin')
                }
       } else { 
           alert('password or username wrong! please try again.')
       }
    }

    render() {
        return (
            <div className="login"> 
            <form className="auth-form" onSubmit={this.handleSubmit}>
                <ul className="form-ul">
                    <li>
                        <label>Username</label>
                        <input type="text" name="username" placeholder="Username" onChange={this.handleChange} value={this.state.username}/>
                    </li>
                    <li>
                        <label>Password</label>
                        <input type="text" name="password" placeholder="Password" onChange={this.handleChange} value={this.state.password}/>
                    </li>
                    <li>
                        <select name="type" onChange={this.handleChange}>
                            <option value="admin">Admin</option>
                            <option value="student">Student</option>
                        </select>
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
