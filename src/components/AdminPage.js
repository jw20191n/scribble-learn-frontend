import React, { Component } from 'react';
import CreateLesson from './CreateLesson';
import LessonInfo from './LessonInfo';


export default class AdminPage extends Component {
    
    state = { 
        username:'',
        lesson: null
    }

    componentDidMount(){
        if(this.props.currentUser){
            this.setState({
                username: this.props.currentUser.username
            })
        }
    }

    setLesson = (data) => {
        this.setState({
            lesson: data
        })
    }

    showLessonInfo = () =>{
        if(this.state.lesson){
            return  <LessonInfo lesson={this.state.lesson}/>
        }
    }

    render() {

        if(this.props.currentUser){
            return (
                <div className="admin-pg">
                    <div className="admin-text">
                        <h1>Welcome, {this.props.currentUser.username}!</h1>
                        <CreateLesson currentUser={this.props.currentUser} setLesson={this.setLesson}/>
                        {
                          this.showLessonInfo()  
                        }
                       
                    </div>
                </div>
            )
        }else{
            return (<div >not login yet</div>)
        }
        
    }
}
