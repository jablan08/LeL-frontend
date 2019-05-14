import React from 'react';

const Tournaments = (props) => {
    console.log(props.tournaments.dataRunning, "DATARUNNING")
    const {dataRunning, dataPast, dataUpcoming} = props.tournaments
    let runningList;
    let upcomingList;
    let pastList;
    let teamsList
    if(props.tournaments.dataRunning){
        console.log(props.tournaments.dataRunning[0].teams, "TEAMSRUNNING")
        runningList = dataRunning.map((tourney, i) => 
            <li key={i}>
                {tourney.league.name} - {tourney.name.toUpperCase()}  <br/>
                <img src={tourney.league.image_url} width="150" height="150"alt=""/>
            </li>
        )
        upcomingList = dataUpcoming.map((tourney, i) => 
            <li key={i}>
                {tourney.league.name} - {tourney.name.toUpperCase()}  <br/>
                <img src={tourney.league.image_url} width="150" height="150"alt=""/>
            </li>
        )
        pastList = dataPast.map((tourney, i) => 
            <li key={i}>
                {tourney.league.name} - {tourney.name.toUpperCase()} <br/>
                <img src={tourney.league.image_url} width="150" height="150"alt=""/>
            </li>
        )
        for(let i =0; i < dataRunning.length; i++) {
            teamsList = dataRunning[i].teams.map((team,i)=>
                <li key={i}>
                    {team.name} <br/>
                    <img src={team.image_url} width="150" height="150"alt=""/>
                </li>
            )
        }
    }
    return (
        <div>
            {
            runningList 
            ? 
            (
                <div>
                    <div>
                        <h3>Current tournaments</h3>
                        <ul>
                            {runningList}
                        </ul>
                        <h3>Upcoming tournaments</h3>
                        <ul>
                            {upcomingList}
                        </ul>
                        <h3>Past tournaments</h3>
                        <ul>
                            {pastList}
                        </ul>
                    </div>
                    <div>
                        <h3>Team in current tournament</h3>
                        <ul>
                            {teamsList}
                        </ul>
                    </div>
                </div>
            )
            : <h1>Loading...</h1>
            }
            
        </div>
    )
   
}

export default Tournaments