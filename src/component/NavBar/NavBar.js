import React from 'react';
import { NavLink } from "react-router-dom";

import * as routes from "../../constants/routes"
import "./NavBar.css"

const NavBar = ({currentUser}) =>
    
    <div>
        <h5>League of eSports Legends</h5>
        <NavLink to={routes.HOME} activeClassName="active">HOME</NavLink> 
        <NavLink to={routes.USERS} activeClassName="active">USERS</NavLink> 
        <NavLink to={routes.POST} activeClassName="active">POST</NavLink> 
        <NavLink exact to={routes.ROOT} activeClassName="active">ROOT</NavLink>
        {
            currentUser
            ? <span>hello {currentUser.username}</span>
            :  <NavLink to={'/login'} activeClassName="selected">LOGIN </NavLink>
        }
    </div>


export default NavBar;