import React from 'react';
import { Link }from "react-router-dom"

const WatchList = (props)=> {
    console.log(props)
    const watchList = props.watchList.map((team,i)=>{
        return (
            <li key={i}>
            <Link to={`/teams/${team.id}`}>
                <span>{team.title}</span><br/>
                <img src={team.image} width="150" height="150" alt=""/><br/>
            </Link>
            <button onClick={()=>props.deleteToWatchList(i)}>Delete</button>
            </li>
        )
    })
    return (
        <div>
            <h3>Favorite Teams</h3>
            <ul>
                {watchList}
            </ul>
        </div>
    )
}


export default WatchList