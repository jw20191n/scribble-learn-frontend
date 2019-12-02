import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class NavBar extends Component {

    renderNav = (user) => {

        if(user === null ){
           return( 
                <nav className='navbar navbar-expand-lg navbar-light bg-light' >
                    <ul className='navbar-nav mr-auto'>
                        <li className='nav-item'><NavLink to="/login" exact className="nav-link">Login</NavLink></li>
                        <li className='nav-item'><NavLink to="/signup" exact className="nav-link">Sign Up</NavLink></li>
                    </ul>
                 </nav>
            )
        }else{
            return( 
                <nav className='navbar navbar-expand-lg navbar-light dg-light' >
                    <span className="navbar-brand">{user.username}</span>
                    <ul className='navbar-nav mr-auto'>
                        <li className='nav-item'><NavLink to="/login" exact className="nav-link">Logout</NavLink></li>
                    </ul>
                </nav>
            )
        }
    }

    render() {
        return(
            this.renderNav(this.props.currentUser)
        )
    }

    
}
