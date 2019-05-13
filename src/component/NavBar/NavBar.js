import React from 'react';
import { NavLink } from "react-router-dom";

import * as routes from "../../constants/routes"
import "./NavBar.css"

const NavBar = ({currentUser}) =>
    
    <div>
        <h5>NAVBAR</h5>
        {console.log(currentUser)}
        <NavLink to={routes.HOME} activeClassName="active">HOME</NavLink> <br/>
        <NavLink to={routes.USERS} activeClassName="active">USERS</NavLink> <br/>
        <NavLink to={routes.POST} activeClassName="active">POST</NavLink> <br/>
        <NavLink exact to={routes.ROOT} activeClassName="active">ROOT</NavLink> <br/>
        {
            currentUser
            ? <span>hello {currentUser.username}</span>
            :  <NavLink to={'/login'} activeClassName="selected">login </NavLink>
        }
    </div>


export default NavBar;