import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class NavBar extends Component {

    renderNav = (user) => {

        if(user === null ){
           return( 
                <nav className='navbar navbar-expand navbar-light bg-light' >
                    <ul className='navbar-nav mr-auto'>
                        <li className='nav-item' data-toggle="tooltip" data-placement="bottom" title="登陆"><NavLink to="/login" exact className="nav-link">Login</NavLink></li>
                        <li className='nav-item' data-toggle="tooltip" data-placement="bottom" title="注册"><NavLink to="/signup" exact className="nav-link">Sign Up</NavLink></li>
                    </ul>
                    <ul className='nav navbar-nav navbar-right'>
                        <span className="logo">Scr<i className="fal fa-pencil-alt"></i>bble Learn</span>
                    </ul>
                 </nav>
            )
        }else{
            return( 
                <nav className='navbar navbar-expand navbar-light dg-light' >
                    <span className="navbar-brand">{user.username}</span>
                    <ul className='navbar-nav mr-auto'>
                        <li className='nav-item' data-toggle="tooltip" data-placement="bottom" title="离开"><NavLink to="/login" exact className="nav-link">Logout</NavLink></li>
                    </ul>
                    <ul className='nav navbar-nav navbar-right'>
                        <span className="logo">Scr<i className="fal fa-pencil-alt"></i>bble Learn</span>
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
