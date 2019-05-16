import React from 'react';
import { Link }from "react-router-dom"
const AllTeam = (props) => { 
    console.log(props.data.dataUpcomingTourney)
    let teamList;
    if (props.data) {  
        teamList = props.data.dataUpcomingTourney.map((tourney, i)=>
        tourney.teams.map((team,i)=>
            <li key={i}>
                <Link to={`/teams/${team.id}`}>
                    {team.name} <br/>
                    <img src={team.image_url} width="150" height="150"alt=""/>
                </Link>
            </li>
        )
    )
}
    return (
        <div>
            {teamList}
        </div>
    )

}
export default AllTeam;