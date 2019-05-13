import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom"
import NavBar from "./component/NavBar/NavBar"
import Login from "./component/Login/Login"
import ShowUser from "./component/ShowUser/ShowUser"

import * as routes from "./constants/routes"

import './App.css';

class App extends Component {
  state = { 
    currentUser: null
   }

  setCurrentUser = (user) => {
    this.setState({
      currentUser: user
    })
  }
  

  componentDidMount() {

  }
  render() { 
    const { currentUser } = this.state
    return ( 
      <div >
      <NavBar currentUser={currentUser}/> 
      <Switch>
        <Route exact path={routes.ROOT} render={()=><div>ROOT</div>}/>
        <Route exact path={routes.HOME} render={()=><div>HOME</div>}/>
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
