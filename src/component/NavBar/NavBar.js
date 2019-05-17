import React from 'react';
import { NavLink } from "react-router-dom";

import * as routes from "../../constants/routes"
import "./NavBar.css"

const NavBar = ({currentUser, doLogout}) =>
    
    <div>
        <h2>League of eSports Legends</h2>
        <NavLink exact to={routes.ROOT} activeClassName="active">HOME</NavLink>
        <NavLink to={routes.TEAMS} activeClassName="active">TEAMS</NavLink> 
        {/* <NavLink to={routes.USERS} activeClassName="active">USERS</NavLink>  */}
        <NavLink to={routes.STANDINGS} activeClassName="active">STANDINGS</NavLink> 
        <NavLink to={routes.SCHEDULE} activeClassName="active">SCHEDULE</NavLink> 
        
        {
            currentUser
            ? <span>hello {currentUser.username} <NavLink to={`${routes.USERS}/${currentUser._id}`}> ACCOUNT </NavLink> <button onClick={doLogout}>LOGOUT</button></span>
            : [<NavLink key={1} to={'/login'} activeClassName="selected">LOGIN </NavLink>,
            <NavLink key={2} to={routes.CREATEUSER} activeClassName="selected">REGISTER </NavLink> ]
            
            
            
        }
    </div>


export default NavBar;