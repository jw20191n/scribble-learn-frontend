import React, { Component } from 'react';
import LessonDetail from './LessonDetail';

export default class CreateLesson extends Component {
    state={
        lessons: []
    }

    componentDidMount(){
        this.getLessons();
    }

    getLessons = () => {
        if(this.props.currentUser){
            fetch('http://localhost:3001/lessons')
                .then(resp=>resp.json())
                .then(data=> {
                    let mylessons = data.filter(lesson => lesson.admin_id === this.props.currentUser.id)
                    if(mylessons.length>0){
                        this.setState({
                            lessons: mylessons
                        })
                    }
                })
        }else{
            alert('sign in to see!')
            this.props.history.push('/login')
        }
    }

    printLessons = () => {
        if(this.state.lessons.length>0){
            return this.state.lessons.map((lesson,i) => { 
                return(
                    <div className="list-group-item" key={i}>
                        <h4>{lesson.name}</h4>
                        {/* <button type="button" className="btn btn-secondary" onClick={()=>this.openDetail(lesson.id)}>detail</button> */}
                        <LessonDetail id={lesson.id}/>
                    </div>
                )
            })
        }else{
            return(<div>You have no lessons, please create one</div>) 
        }
    }
    
    render() {
        return(
            <div className="container">
                <div className="list-group">
                    {this.printLessons()}
                </div>
            </div>
        )
    }
}
