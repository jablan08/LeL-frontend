import React from 'react';

const boxDiv = {
    
}

const ListTournaments = (props) => 
    <li>
        {props.tourney.league.name} - {props.tourney.name.toUpperCase()}  <br/>
        <img src={props.tourney.league.image_url} width="150" height="150"alt=""/>
    </li>
    

const Tournaments = (props) => {
    // console.log(props.tournaments.dataRunning, "DATARUNNING")
    const {dataRunning, dataPast, dataUpcoming, dataPastMatches} = props.data
    let runningList;
    let upcomingList;
    let pastList;
    let teamsList;
    let pastMatchesList;
    if(props.data.dataRunning){
        console.log(props.data.dataRunning[0].teams, "TEAMSRUNNING")
        runningList = dataRunning.map((tourney, i) => 
            <ListTournaments tourney={tourney} key={i} />
        )
        upcomingList = dataUpcoming.map((tourney, i) => 
            <ListTournaments tourney={tourney} key={i} />
        )
        pastList = dataPast.map((tourney, i) => 
            <ListTournaments tourney={tourney} key={i} />
        )
        teamsList = dataRunning.map((tourney,i)=> 
            tourney.teams.map((team, i)=>
            <li key={i}>
                {team.name} <br/>
                <img src={team.image_url} width="150" height="150"alt=""/>
            </li>
            )
        )
        pastMatchesList = dataPastMatches.map((match,i)=>{
            return(
                <div key={i}>
                    <h4>{match.name}</h4>
                    {
                        match.opponents.map((opponent, i)=>
                        <li key={i}>
                            {opponent.opponent.name} <br/>
                            <img src={opponent.opponent.image_url} width="150" height="150"alt=""/>
                        </li>
                        )
                    }
                </div>
                

            )

        }
        )

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
                    <div>
                        <h3>Past Matches</h3>
                        <ul>
                            {pastMatchesList}
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