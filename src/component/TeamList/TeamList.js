import React from 'react';

const TeamList = (props) =>{
    console.log(props.data.fullTeam)
    const {name,players,image_url} = props.data.fullTeam
    
    const teamList = players.map((player,i)=>
        <li key={i}>
            {player.name}
            {
                player.image_url 
                ? <img src={player.image_url} width="125" height="100" alt=""/>
                : <h3>No image available</h3>
            } 
            ROLE: {player.role ? player.role.toUpperCase(): "Not specified"}
        </li>
    )

    return (
        <div>
            {name}
            <img src={image_url} width="300" height="300" alt=""/>
            
            <ul>
                {teamList}
            </ul>
        </div>
    )
    }
    export default TeamList