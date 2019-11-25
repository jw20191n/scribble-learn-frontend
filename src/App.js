import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AdminPage from './components/AdminPage';
import StudentPage from './components/StudentPage';
import CreateLesson from './components/CreateLesson';
import Lessons from './components/Lessons';
import Canvas from './components/Canvas';
import Game from './components/Game';
import Toolbar from './components/Toolbar';


class App extends React.Component {

  state={
    currentUser: null,
    // words:[]
  }

  setCurrentUser = (user) => { 
    this.setState({ 
      currentUser: user
    })
  }

  signOut = () => {
    this.setState({
      currentUser: null
    })
  }

  // setWordState = (array) => {
  //   this.setState({
  //     words: array
  //   })
  // }

  render() {
    return (
      <Router>
        <div> 
          <NavBar currentUser={this.state.currentUser}/> 
          <Switch>
            <Route exact path="/" render={() => <Home /> }/>
            <Route exact path="/login" render={(routerProps) => <Login setCurrentUser={this.setCurrentUser} {...routerProps}/> } /> 
            <Route exact path='/signup' render={(routerProps) => <SignUp {...routerProps} setCurrentUser={this.setCurrentUser}/> } /> 
            <Route exact path='/student' render={(routerProps) => <StudentPage currentUser={this.state.currentUser} {...routerProps}  setCurrentUser={this.setCurrentUser} /> } /> 
            <Route exact path='/admin' render={() => <AdminPage currentUser={this.state.currentUser}/> } /> 
            <Route exact path='/createlesson' render={(routerProps) => <CreateLesson currentUser={this.state.currentUser} {...routerProps}/> } /> 
            <Route exact path='/lessons' render={(routerProps) => <Lessons currentUser={this.state.currentUser} {...routerProps}/> } /> 
            <Route exact path='/canvas' render={() => <Canvas currentUser={this.state.currentUser} /> } /> 
            <Route exact path='/game' render={(routerProps) => <Game currentUser={this.state.currentUser} {...routerProps}/> } /> 
          </Switch>
        </div>
      </ Router>
    )
  }
}

export default App;