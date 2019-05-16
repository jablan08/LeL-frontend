import React, { Component } from 'react';

import { Link }from "react-router-dom"

class AllTeams extends Component {
    state = { 
        data: [],
    }

    componentDidMount() {
        this.getTeams().then(allData => {
            console.log(allData)
            this.setState({
                data: allData.allTeams
            })
        })
    }

    getTeams = async () => {
        try {
            const teams = await fetch(`/api/teams`, {
                credentials: "include"
            })
            const teamsJson = await teams.json()
            if(teamsJson.success){
              return teamsJson
            }
        } catch (error) {
          console.log(error)
        }
    }
    getInfo = async (ids) =>{
        try {
            const teamShow = await fetch(`/api/teams/${ids}`, {
                // body: JSON.stringify(this.state.data[0].id),
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
    


    render() { 
        const { data } = this.state
        console.log(data)
        return (
            <div>
                {
                    data.map((tourney,i)=>
                        tourney.teams.map((team,i)=>
                            <li key={i} onClick={()=>this.getInfo(team.id)}>
                                <Link to={`/teams/${team.id}`} >
                                    {team.name} <br/>
                                    {team.id}
                                    <img src={team.image_url} width="150" height="150"alt=""/>
                                </Link>
                            </li>
                        )
                    )
                }
            </div>

        );
    }
}
 
export default AllTeams;


