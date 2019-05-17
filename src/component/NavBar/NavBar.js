import React from 'react';
import { NavLink } from "react-router-dom";

import * as routes from "../../constants/routes"
import "./NavBar.css"
import styled from "styled-components";

const Nav = styled(NavBar)`
    margin: 1rem;

`

const NavBar = ({currentUser, doLogout}) =>
    
    <div className="nav">
        <h2 className="title">League of eSports Legends</h2>
        <Nav>
            <NavLink exact to={routes.ROOT} activeClassName="active">HOME</NavLink>
            <NavLink to={routes.TEAMS} activeClassName="active">TEAMS</NavLink> 
            {/* <NavLink to={routes.USERS} activeClassName="active">USERS</NavLink>  */}
            <NavLink to={routes.STANDINGS} activeClassName="active">STANDINGS</NavLink> 
            <NavLink to={routes.SCHEDULE} activeClassName="active">SCHEDULE</NavLink> 
            
            {
                currentUser
                ? <span>hello {currentUser.username} <NavLink to={`${routes.USERS}/${currentUser._id}`}> ACCOUNT </NavLink> <button onClick={doLogout}>LOGOUT</button></span>
                : [<NavLink key={1} to={'/login'} activeClassName="active">LOGIN </NavLink>,
                <NavLink key={2} to={routes.CREATEUSER} activeClassName="active">REGISTER </NavLink> ]
                
                
                
            }
        </Nav>
    </div>


export default NavBar;