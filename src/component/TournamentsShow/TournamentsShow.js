import React, { Component } from "react";
import { Link } from "react-router-dom"
import styled from "styled-components";

const Linked = styled(Link)`    
    :hover {
        color: #F5F5F5
    }
`

class TourneyShow extends Component {
    state = { 
        stats: [],
        tournamentData: [],
        tourneyId: window.location.pathname.split("/")[2]
    }

    componentDidMount() {
        this.getTournament(this.state.tourneyId).then(allData => {
            this.setState({
                stats: allData.tournamentStats,
                tournamentData: allData.tournament
            })
        })
    }

    getTournament = async (id) => {
        try {
            const schedule = await fetch(`/api/tournament/${id}`)
          
            const scheduleJson = await schedule.json()
            
            if(scheduleJson.success){
              return scheduleJson
            }
          
        } catch (error) {
          console.log(error)
        }
      }
    render() {
        const { stats, tournamentData } = this.state
       
        return ( 
            <div>
                {
                    tournamentData.name
                    ?  <div>
                            <h3>{tournamentData.league.name}</h3>
                            <h4>{tournamentData.name}</h4>
                            <img src={tournamentData.league.image_url} height="200" alt=""/>
                            <div className="list-container-1">
                                {
                                    stats.map((team,i)=>
                                        <li key={i} className="links">
                                            <h6>RANK: {team.rank}</h6>
                                            <Linked to={`/teams/${team.team.id}`}>
                                                <span className="team titles" > {team.team.name} <br/> </span>
                                                <img src={team.team.image_url} height="100"alt=""/>
                                            </Linked>
                                            {
                                                team.wins
                                                && <span className="win-class team-titles">Wins: {team.wins} Losses: {team.losses}</span>
                                            }
                                        </li>
                                    
                                    )
                                }
                            </div>
                        </div>
                    : <h2>Loading...</h2>
                }

            </div>
           
         );
    }
}
 
export default TourneyShow;