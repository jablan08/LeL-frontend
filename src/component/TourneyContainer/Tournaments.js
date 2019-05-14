import React from 'react';

const Tournaments = (props) => {
    console.log(props.tournaments.dataRunning, "DATARUNNING")
    let runningList;
    let upcomingList;
    let pastList;
    if(props.tournaments.dataRunning){
        runningList = props.tournaments.dataRunning.map((tourney, i) => 
    <li key={i}>
        {tourney.league.name} - {tourney.name.toUpperCase()}  <br/>
        <img src={tourney.league.image_url} width="200" height="200"alt=""/>
    </li>
        )
        upcomingList = props.tournaments.dataUpcoming.map((tourney, i) => 
    <li key={i}>
        {tourney.league.name} - {tourney.name.toUpperCase()}  <br/>
        <img src={tourney.league.image_url} width="200" height="200"alt=""/>
    </li>
        )
        pastList = props.tournaments.dataPast.map((tourney, i) => 
    <li key={i}>
        {tourney.league.name} - {tourney.name.toUpperCase()} <br/>
        <img src={tourney.league.image_url} width="200" height="200"alt=""/>
    </li>
        )
    }
    return (
        <div>
            {
            runningList 
            ? 
            (
                <div>
                    <h3>Current tournaments</h3>
                    <ul>{runningList}</ul>
                    <h3>Upcoming tournaments</h3>
                    <ul>{upcomingList}</ul>
                    <h3>Past tournaments</h3>
                    <ul>{pastList}</ul>
                </div>
            )
            : <h1>Loading...</h1>
            }
            
        </div>
    )
   
}

export default Tournaments