import React, { Component } from 'react';
import CreateLesson from './CreateLesson';


export default class AdminPage extends Component {
    
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
                    <CreateLesson currentUser={this.props.currentUser}/>
                    
                </div>
            )
        }else{
            return (<div >not login yet</div>)
        }
        
    }
}
