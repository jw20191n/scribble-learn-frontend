import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class NavBar extends Component {

    render() {
        return( 
            <div className='navigation-bar' >
                <ul className='nav-list'>
                    <li className='nav-btn'><NavLink to="/" exact>Home</NavLink></li>
                    <li className='nav-btn'><NavLink to="/login" exact >Login</NavLink></li>
                    <li className='nav-btn'><NavLink to="/signup" exact>Sign Up</NavLink></li>
                </ul>
            </div>
        )
    }
}