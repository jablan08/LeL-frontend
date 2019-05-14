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
    tournaments: [],
    matches: [],
    teams: [],
    
   }

  setCurrentUser = (user) => {
    this.setState({
      currentUser: user
      
    })
  }

  
  
  
  componentDidMount() {
    this.getTournaments().then(data =>
     { 
      console.log(data)
      this.setState({
        tournaments: data
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
    const { currentUser, tournaments } = this.state
    console.log(tournaments,"FULLL ARRAY")
    return ( 
      <div >
      <NavBar currentUser={currentUser}/> 
      <Switch>
        <Route exact path={routes.ROOT} render={()=><div>ROOT</div>}/>
        <Route exact path={routes.HOME} render={()=> <Tournaments tournaments={tournaments}/>}/>
        <Route exact path={routes.USERS} render={() => <div>USER</div>} />
        <Route exact path={`${routes.USERS}/:id`} render={() => <ShowUser />} />
        <Route exact path={routes.POST} render={()=><div>DIE KARP DIE</div>}/>
        <Route exact path={routes.LOGIN} render={()=> <Login currentUser={currentUser} setCurrentUser={this.setCurrentUser}/>} />
        <Route render={()=> <div>You're LOST</div>}/>
      </Switch>
      
    </div>
     );
  }
}

export default App;
