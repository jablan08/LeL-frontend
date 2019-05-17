import React, { Component } from "react";
import { Link } from "react-router-dom"

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
                                        <li key={i}>
                                            <h6>RANK: {team.rank}</h6>
                                            <Link to={`/teams/${team.team.id}`} className="links">
                                                <span className="team titles" > {team.team.name} <br/> </span>
                                                <img src={team.team.image_url} height="100"alt=""/>
                                            </Link>
                                            {
                                                <span className="team titles" > team.wins </span>
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