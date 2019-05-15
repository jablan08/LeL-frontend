import React from 'react';
import { NavLink } from "react-router-dom";

import * as routes from "../../constants/routes"
import "./NavBar.css"

const NavBar = ({currentUser}) =>
    
    <div>
        <h5>League of eSports Legends</h5>
        <NavLink exact to={routes.ROOT} activeClassName="active">HOME</NavLink>
        <NavLink to={routes.TEAMS} activeClassName="active">TEAMS</NavLink> 
        {/* <NavLink to={routes.USERS} activeClassName="active">USERS</NavLink>  */}
        <NavLink to={routes.STANDINGS} activeClassName="active">STANDINGS</NavLink> 
        <NavLink to={routes.SCHEDULE} activeClassName="active">SCHEDULE</NavLink> 
        <NavLink to={routes.ALLMATCHES} activeClassName="active">ALL MATCHES</NavLink> 
        {
            currentUser
            ? <span>hello {currentUser.username}</span>
            : [<NavLink key={1} to={'/login'} activeClassName="selected">LOGIN </NavLink>,
            <NavLink key={2} to={routes.CREATEUSER} activeClassName="selected">REGISTER </NavLink> ]
            
            
            
        }
    </div>


export default NavBar;