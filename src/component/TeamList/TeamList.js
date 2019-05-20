import React from 'react';

const TeamList = (props) =>{
    
    const {name,players,image_url} = props.data.fullTeam
    
    const teamList = players.map((player,i)=>
        <li key={i} className="team-list-li">
            <span className="team-titles">
            {player.name}
            </span>
            {
                player.image_url 
                ? <img src={player.image_url} height="150" alt=""/>
                : <h3>No image available</h3>
            } 
            <span className="team-titles">
            ROLE: {player.role ? player.role.toUpperCase(): "Not specified"}
            </span>
        </li>
    )

    return (
        <div>
            <span className="team-titles">
            {name}
            </span>
            <img src={image_url} width="300" height="300" alt=""/>
            
            <ul>
                {teamList}
            </ul>
        </div>
        )
}
export default TeamList