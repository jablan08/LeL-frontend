import React from 'react';
import moment from "moment";
import { Link }from "react-router-dom"


const ListTournaments = (props) => 
    <Link to={`/tournaments/${props.tourney.id}`}>
        <li>
            {props.tourney.league.name} - {props.tourney.name.toUpperCase()}  <br/>
            <img src={props.tourney.league.image_url} width="150" height="150"alt=""/>
        </li>
    </Link>

const ListNames = (props) => 
    <li>
        {props.match.league.name} - {props.match.name.toUpperCase()}  <br/>
    </li>

const ListTeams = (props) =>
        props.tourney.teams.map((team,i)=>
            <li key={i}>
                {team.name} <br/>
                <img src={team.image_url} width="150" height="150"alt=""/>
            </li>
        )

const ListOpponents = (props) => 
    <div>
        <div>
            <h4>{props.match.name}</h4>
            <h6>{dateBegin(props.match.begin_at)}</h6>
            <h6>{timeBegin(props.match.begin_at)}</h6>
        </div>

        {
            props.match.opponents.map((opponent, i)=>
            <li key={i}>
                {opponent.opponent.name} <br/>
                <img src={opponent.opponent.image_url} width="50" height="50"alt=""/>
                <h6>WINS:{props.match.results[i].score}</h6>
            </li>
            )
        }
    </div>

const dateBegin = str =>
    new Date(str).toDateString();

const timeBegin = str => 
    moment(new Date(str).toTimeString().split("G")[0],"hh,mm,ss").format("h:mm A");
    

const Tournaments = (props) => {
    const {dataRunning, dataPast, dataUpcoming, dataPastMatches} = props.data
    let runningList;
    // let upcomingList;
    let upcomingTeamsList;
    let pastList;
    let teamsList;
    let pastMatchesList;
    if(props.data.dataRunning){
        console.log(props.data.dataRunning[0].teams, "TEAMSRUNNING")
        runningList = dataRunning.map((tourney, i) => 
            
            <ListTournaments tourney={tourney} key={i} />
        )

        // upcomingList = dataUpcoming.map((match, i) => 
        //     <ListNames match={match} key={i} />
        // )

        upcomingTeamsList = dataUpcoming.map((match, i) => 
            <ListOpponents match={match} key={i}/>
        )

        pastList = dataPast.map((tourney, i) => 
            <ListTournaments tourney={tourney} key={i} />
        )

        teamsList = dataRunning.map((tourney, i)=>
            <ListTeams tourney={tourney} key={i} />
        )

        pastMatchesList = dataPastMatches.map((match,i)=>{ 
            return(
                <ListOpponents match={match} key={i}/>
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
                        <div>
                            <h3>Current tournaments</h3>
                            <ul>
                                {runningList}
                            </ul>
                        </div>

                        <div>
                            <h3>Upcoming Matches</h3>
                            {/* <div>
                                <ul>
                                    {upcomingList}
                                </ul>
                            </div> */}
                            <div>
                                {upcomingTeamsList}
                            </div>
                        </div>

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