import React, { Component } from 'react';

export default class CreateLesson extends Component {
    state={
        lessons: []
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
                    <div className="card" key={i}>
                        <p>Name: {lesson.name}</p>
                        <p>Passcode: {lesson.passcode}</p>
                        <p>Description: {lesson.description}</p>
                    </div>
                )
            })
        }else{
            return(<div>You have no lessons, please create one</div>) 
        }
    }

    componentDidMount(){
        this.getLessons();
    }
    
    render() {
        return(this.printLessons())
    }
}
