import React from 'react';
import moment from "moment";



const ListTournaments = (props) => 
    <li>
        {props.tourney.league.name} - {props.tourney.name.toUpperCase()}  <br/>
        <img src={props.tourney.league.image_url} width="150" height="150"alt=""/>
    </li>

const ListTeams = (props) =>
        props.tourney.teams.map((team,i)=>
            <li key={i}>
                {team.name} <br/>
                <img src={team.image_url} width="150" height="150"alt=""/>
            </li>
        )
    

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
        // upcomingTeamsList = dataUpcoming.map((tourney, i) => 
        //     <ListTournaments tourney={tourney} key={i} />
        // )

        pastList = dataPast.map((tourney, i) => 
            <ListTournaments tourney={tourney} key={i} />
        )
        teamsList = dataRunning.map((tourney, i)=>
            <ListTeams tourney={tourney} key={i}/>
        )
        pastMatchesList = dataPastMatches.map((match,i)=>{
            let dateBegin = new Date(match.begin_at).toDateString()
            let timeBegin = moment(new Date(match.begin_at).toTimeString().split("G")[0],"hh,mm,ss").format("h:mm A")
            return(
                    <div key={i}>
                        <div>
                            <h4>{match.name}</h4>
                            <h6>{dateBegin}</h6>
                            <h6>{timeBegin}</h6>
                        </div>
                        {
                            match.opponents.map((opponent, i)=>
                            <li key={i}>
                                {opponent.opponent.name} <br/>
                                <h6>WINS:{match.results[i].score}</h6>
                                <img src={opponent.opponent.image_url} width="50" height="50"alt=""/>
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
                        <h3>Upcoming Matches</h3>
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