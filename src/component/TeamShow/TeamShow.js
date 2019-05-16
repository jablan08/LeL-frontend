import React, { Component } from 'react';
import TeamList from "../TeamList/TeamList"

class TeamShow extends Component {
    state = { 
        data: [],
        teamId: window.location.pathname.split("/")[2]

    }
    componentDidMount() {
        this.getTeam(this.state.teamId).then(allData => {
            
            this.setState({
                data: allData
            })
        })
    }

    getTeam = async (ids) =>{
        try {
            const teamShow = await fetch(`/api/teams/${ids}`, {
                // body: JSON.stringify(this.state.data[0].id),
                credentials: "include"
            })
            const teamShowJson = await teamShow.json()
            if(teamShowJson.success){
                console.log(teamShowJson)
                return teamShowJson
              }
        } catch (error) {
            console.log(error)
        }
    }


    render() { 
       const {data} = this.state
       console.log(data)
        return ( 
            <div>
                {
                    data.length === 0
                    ? <h1>Loading...</h1>
                    : <TeamList data={data}/>

                }
            </div>
         );
    }
}
 
export default TeamShow;