import React from 'react';
import { Link }from "react-router-dom"
const AllTeam = (props) => { 
    
    let teamList;
    if (props.data.dataUpcomingTourney) {  
        teamList = props.data.dataUpcomingTourney.map((tourney, i)=>
        tourney.teams.map((team,i)=>
            <li key={i} className="team-list-li">
                <Link to={`/teams/${team.id}`} className="links">
                    <span className="team-titles">{team.name} </span> <br/>
                    <img src={team.image_url} width="150" height="150"alt=""/>
                </Link>
            </li>
        )
    )
}
    return (
        <div className="team-list-1">
            {
                props.data.dataUpcomingTourney
                ? teamList
                : <h2> Loading... </h2>
            }
            
        </div>
    )

}
export default AllTeam;