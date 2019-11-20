import React, { Component } from 'react';


export default class StudentPage extends Component {
    
    state = { 
        username:''
    }

    componentDidMount(){
        if(this.props.currentUser){
            this.setState({
                username: this.props.currentUser.username
            })
        }
    }

    render() {
        if(this.props.currentUser){
            return (
                <div >
                    <h1>Welcome, {this.props.currentUser.username}!</h1>
                </div>
            )
        }else{
            return (<div >not login yet</div>)
        }
    }
}