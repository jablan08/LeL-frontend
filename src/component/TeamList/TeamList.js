import React from 'react';

const TeamList = (props) =>{
    const {name,players,image_url} = props.data.fullTeam
    const teamList = players.map((player,i)=>
        <li key={i}>
            {player.name} 
            <img src={player.image_url} width="125" height="100" alt=""/>
            ROLE: {player.role.toUpperCase()}
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