import React, { Component } from 'react';
import TeamList from "../TeamList/TeamList"

class TeamShow extends Component {
    state = { 
        data: [],
        teamId: window.location.pathname.split("/")[2],
        message: "",
        addMessage: null,


    }
    componentDidMount() {
        this.getTeam(this.state.teamId).then(allData => {
            
            this.setState({
                data: allData,
            })
        })
    }

    getTeam = async (ids) =>{
        try {
            const teamShow = await fetch(`/api/teams/${ids}`, {

                credentials: "include"
            })
            const teamShowJson = await teamShow.json()
            if(teamShowJson.success){
                return teamShowJson
              }
        } catch (error) {
            console.log(error)
        }
    }

    addTeamToWatch = async (team) => {
       
        try {
           
                const addTeam = await fetch("/users/add", {
                    method: "POST",
                    body: JSON.stringify(team),
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const parsedResponse = await addTeam.json();
              
                if (parsedResponse.success) {
                    
                    this.props.setCurrentUser(parsedResponse.updatedUser)
                    this.setState({
                        addMessage: "Added to watch list!"
                    })

                }
            
            } catch(err) {
            console.log(err)
        }

    }
    render() { 
       const {data, message, addMessage} = this.state
      
        return ( 
            <div>
                <div className="team-show-1">
                    <h1>{data.name}</h1>
                    {
                        this.props.currentUser
                        && [<button key={1}type="submit" onClick={()=> this.addTeamToWatch(data.fullTeam)}>Add to WatchList</button>,
                        <span key={2}>{addMessage} </span>]
                    }
                </div>
                {
                    data.length === 0
                    ? <h1>Loading...</h1>
                    : [<h3 key={1}>{message}</h3>, <TeamList key={2} addTeamToWatch={this.addTeamToWatch} data={data}/>]
                }
                
            </div>
         );
    }
}
 
export default TeamShow;