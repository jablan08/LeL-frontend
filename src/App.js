import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom"
import NavBar from "./component/NavBar/NavBar"
import Login from "./component/Login/Login"
import ShowUser from "./component/ShowUser/ShowUser"
import Tournaments from "./component/TourneyContainer/Tournaments"

import * as routes from "./constants/routes"

import './App.css';



require("dotenv").config();

class App extends Component {
  state = { 
    currentUser: null,
    data: []
    
   }

  setCurrentUser = (user) => {
    this.setState({
      currentUser: user
      
    })
  }
  
  componentDidMount() {
    this.getTournaments().then(allData =>
      {
        console.log(allData) 
        this.setState({
          data: allData.data
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
  // getTeams = async () => {
  //   try {
  //     const teams = await fetch(`/api/teams`)
      
  //       const tournamentsJson = await tournaments.json()
        
  //       if(tournamentsJson.success){
  //         return tournamentsJson
  //       }
      
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  
  
  render() { 
    const { currentUser, data } = this.state
    console.log(data,"FULLL ARRAY")
    return ( 
      <div >
      <NavBar currentUser={currentUser}/> 
      <Switch>
        <Route exact path={routes.ROOT} render={()=><Tournaments data={data}/>}/>
        <Route exact path={routes.TEAMS} render={()=> <div> TEAMS </div>}/>
        <Route exact path={routes.STANDINGS} render={() => <div>STANDINGS</div>} />
        <Route exact path={routes.SCHEDULE} render={() => <div>SCHEDULE</div>} />
        <Route exact path={`${routes.USERS}/:id`} render={() => <ShowUser />} />
        <Route exact path={routes.ALLMATCHES} render={()=><div>ALL MATCHES</div>}/>
        <Route exact path={routes.LOGIN} render={()=> <Login currentUser={currentUser} setCurrentUser={this.setCurrentUser}/>} />
        <Route render={()=> <div>You're LOST</div>}/>
      </Switch>
      
    </div>
     );
  }
}

export default App;
