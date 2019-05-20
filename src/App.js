import React, { Component } from 'react';
import { Switch, Route, withRouter } from "react-router-dom"
import NavBar from "./component/NavBar/NavBar"
import Login from "./component/Login/Login"
import ShowUser from "./component/ShowUser/ShowUser"
import Tournaments from "./component/TourneyContainer/Tournaments"
import AllTeam from "./component/AllTeams/AllTeam"
import CreateUser from "./component/CreateUser/CreateUser"
import TeamShow from "./component/TeamShow/TeamShow"
import Match from "./component/MatchShow/MatchShow"
import Schedule from "./component/Schedule/Schedule"
import TourneyShow from "./component/TournamentsShow/TournamentsShow"

import * as routes from "./constants/routes"

import './App.css';

require("dotenv").config();

class App extends Component {
  state = { 
    currentUser: null,
    data: [],
    upcoming:[]
    
   }

  setCurrentUser = (user) => {
    this.setState({
      currentUser: user
      
    })
  }
  
  doLogout= async () => {
    await fetch("/login/logout", {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
      }
    })
    this.setState({
      currentUser: null
    })
    this.props.history.push(routes.LOGIN)
  }

  
  componentDidMount() {
    this.getTournaments().then(allData =>
      {
        
        this.setState({
          data: allData.data,
          upcoming: allData.data.dataUpcoming
        })
      }
    )  
  }
  
  getTournaments = async () => {
    try {
      const tournaments = await fetch(`/api/tournaments`)
      
        const tournamentsJson = await tournaments.json()
        
        if(tournamentsJson.success){
          return tournamentsJson
        }
      
    } catch (error) {
      console.log(error)
    }
  }
 
  
  
  render() { 
    const { currentUser, data, upcoming } = this.state
    return ( 
      <div >
        <NavBar doLogout={this.doLogout} currentUser={currentUser}/> 
        
        <Switch>
          <Route exact path={routes.ROOT} render={()=> <Tournaments data={data}/> }/>
          <Route exact path={routes.TEAMS} render={()=> <AllTeam data={data}/> }/>
          <Route exact path={`${routes.TEAMS}/:id`} render={()=> <TeamShow data={data} currentUser={currentUser} setCurrentUser={this.setCurrentUser} />}/> 
          <Route exact path={`${routes.TOURNAMENTS}/:id`} render={() => <TourneyShow dataTourney={data} />} />
          <Route exact path={`${routes.MATCH}/:id`} render={()=> <Match data={data}/>}/>
          <Route exact path={routes.CREATEUSER} render={() => <CreateUser currentUser={currentUser} setCurrentUser={this.setCurrentUser}/>} />
          <Route exact path={routes.SCHEDULE} render={() => <Schedule data={upcoming}/>} />
          <Route exact path={`${routes.USERS}/:id`} render={() => <ShowUser />} />
          <Route exact path={routes.LOGIN} render={()=> <Login currentUser={currentUser} setCurrentUser={this.setCurrentUser}/>} />
          <Route render={()=> <div>You're LOST</div>}/>
        </Switch>
      
      </div>
     );
  }
}

export default withRouter(App) ;



