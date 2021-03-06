import React from 'react';
import { NavLink } from "react-router-dom";

import * as routes from "../../constants/routes"
import "./NavBar.css"
import styled from "styled-components";

const Nav = styled(NavLink)`
    margin: 1rem;
    font-size: 3rem;
    color: rgb(212,175,55);    

    :hover {
        color: #F5F5F5
    }

`
const Title = styled.h1`
    font-size: 4rem;
    margin: 1.5rem;
`

const NavBar = ({currentUser, doLogout}) =>
    
    <div className="nav">
        <Title className="title">League of eSports Legends</Title>
            <Nav exact to={routes.ROOT} activeClassName="active">HOME</Nav>
            <Nav to={routes.TEAMS} activeClassName="active">TEAMS</Nav> 
            <Nav to={routes.SCHEDULE} activeClassName="active">SCHEDULE</Nav> 
            {
                currentUser
                ? <span className="message"> <Nav to={`${routes.USERS}/${currentUser._id}`}> ACCOUNT </Nav> Hello {currentUser.username} <button onClick={doLogout} className="navButton" >LOGOUT</button></span>
                : [<Nav key={1} to={'/login'} activeClassName="active">LOGIN </Nav>,
                <Nav key={2} to={routes.CREATEUSER} activeClassName="active">REGISTER </Nav> ]   
            }
    </div>
export default NavBar;