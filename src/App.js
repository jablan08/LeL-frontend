import React, { Component } from 'react';
import { Switch, Route, withRouter } from "react-router-dom"
import NavBar from "./component/NavBar/NavBar"
import Login from "./component/Login/Login"
import ShowUser from "./component/ShowUser/ShowUser"
import Tournaments from "./component/TourneyContainer/Tournaments"
import AllTeam from "./component/AllTeams/AllTeam"
import CreateUser from "./component/CreateUser/CreateUser"
import TeamShow from "./component/TeamShow/TeamShow"

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
  
  doLogout= () => {
    this.setState({
      currentUser: null
    })
    this.props.history.push(routes.LOGIN)
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
      const tournaments = await fetch(`https://leagueofesportslegends.herokuapp.com/api/tournaments`, {
        credentials: "include"
      })
      
        const tournamentsJson = await tournaments.json()
        
        if(tournamentsJson.success){
          return tournamentsJson
        }
      
    } catch (error) {
      console.log(error)
    }
  }
 
  
  
  render() { 
    const { currentUser, data } = this.state
    console.log(data,"FULLL ARRAY")
    return ( 
      <div >
      <NavBar doLogout={this.doLogout} currentUser={currentUser}/> 
      <Switch>
        <Route exact path={routes.ROOT} render={()=><Tournaments data={data}/>}/>

        <Route exact path={routes.TEAMS} render={()=> <AllTeam data={data}/> }/>
        <Route exact path={`${routes.TEAMS}/:id`} render={()=> <TeamShow data={data} currentUser={currentUser} setCurrentUser={this.setCurrentUser} />}/> 

        <Route exact path={`${routes.PLAYER}/:id`} render={()=> <div> PLAYER SHOW </div>}/>

        <Route exact path={routes.TOURNAMENTS} render={() => <div>TOURNAMENTS</div>} />
        <Route exact path={`${routes.TOURNAMENTS}/:id`} render={() => <div>TOURNAMENTS SHOW</div>} />

        <Route exact path={routes.ALLMATCHES} render={()=><div>ALL MATCHES</div>}/>
        <Route exact path={`${routes.MATCH}/:id`} render={()=><div>MATCH</div>}/>

        <Route exact path={routes.STANDINGS} render={() => <div>STANDINGS</div>} />
        <Route exact path={routes.CREATEUSER} render={() => <CreateUser currentUser={currentUser} setCurrentUser={this.setCurrentUser}/>} />

        <Route exact path={routes.SCHEDULE} render={() => <div>SCHEDULE</div>} />
       
        <Route exact path={`${routes.USERS}/:id`} render={() => <ShowUser />} />
      
        <Route exact path={routes.LOGIN} render={()=> <Login currentUser={currentUser} setCurrentUser={this.setCurrentUser}/>} />
        <Route render={()=> <div>You're LOST</div>}/>

      </Switch>
      
    </div>
     );
  }
}

export default withRouter(App) ;



