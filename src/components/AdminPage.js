import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


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
                    <ul className='admin-btn-list'>
                        <li className='admin-page-btn'><NavLink to="/createlesson" exact>Create Lesson</NavLink></li>
                        <li className='admin-page-btn'><NavLink to="/lessons" exact >All Lessons</NavLink></li>
                     </ul>
                </div>
            )
        }else{
            return (<div >not login yet</div>)
        }
        
    }
}
