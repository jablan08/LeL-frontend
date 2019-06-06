import React from 'react';
import moment from "moment";
import { Link } from "react-router-dom"
import styled from "styled-components";

const Linked = styled(Link)`    
    color: rgb(212,175,55);

    :hover {
        color: #F5F5F5
    }
`

const ListTournaments = (props) => 
        <li>
            <Linked to={`/tournaments/${props.tourney.id}`}>
                <span className="team-titles"> {props.tourney.league.name} - {props.tourney.name.toUpperCase()}  <br/> </span>
                <img src={props.tourney.league.image_url} width="150" height="150"alt=""/>
            </Linked>
        </li>

const ListTeams = (props) =>
        props.tourney.teams.map((team,i)=>
            <li key={i}>
                <Linked to={`/teams/${team.id}`}>
                    <span className="team-titles"> {team.name} <br/> </span>
                    <img src={team.image_url} width="150" height="150"alt=""/>
                </Linked>
            </li>
        )

const ListOpponents = (props) => 
    <div >
        <div>
            <Linked to={`/match/${props.match.id}`}>
                <h4>{props.match.name}</h4>
            </Linked>
            <h6>{dateBegin(props.match.begin_at)}</h6>
            <h6>{timeBegin(props.match.begin_at)}</h6>
        </div>
        {
            props.match.opponents.map((opponent, i)=>
                <li key={i}>
                    <Linked  to={`/teams/${opponent.opponent.id}`}>
                        <span className="team-titles"> {opponent.opponent.name} <br/> </span>
                        <img src={opponent.opponent.image_url} width="50" height="50"alt=""/>
                    </Linked>
                    {
                    

                    }
                    <h6>WINS:
                        {
                            props.match.results[0].team_id === opponent.opponent.id 
                            ? props.match.results[0].score
                            : props.match.results[1].team_id === opponent.opponent.id 
                                && props.match.results[1].score
                        }
                    </h6>
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
    let upcomingTeamsList;
    let pastList;
    let teamsList;
    let pastMatchesList;
    if(props.data.dataRunning){
    
        runningList = dataRunning.map((tourney, i) => 
            <ListTournaments tourney={tourney} key={i} />
        )

        upcomingTeamsList = dataUpcoming.map((match, i) => 
            <ListOpponents match={match} key={i}/>
        )

        pastList = dataPast.map((tourney, i) => 
            <ListTournaments tourney={tourney} key={i} />
        )

        teamsList = dataRunning.map((tourney, i)=>
            <ListTeams tourney={tourney} key={i} />
        )

        pastMatchesList = dataPastMatches.map((match,i)=>
                <ListOpponents match={match} key={i}/>  
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
                        <div className="home-box-1">
                            <h3>Current tournaments</h3>
                            {
                                dataRunning.length 
                                ?   <ul>
                                        {runningList}
                                    </ul> 
                                : <h2>No tournament stages currently running </h2>
                            }
                        </div>

                        <div className="home-box-2">
                            <h3>Upcoming Matches</h3>
                            
                            <div className="list-container-1">
                                {upcomingTeamsList}
                            </div>
                        </div>
                        <div className="home-box-3">       
                            <h3>Past tournaments</h3>
                            <div className="list-container-2">
                                <ul>
                                    {pastList}
                                </ul>

                            </div>
                        </div>
                    </div>
                    <div className="home-box-4">
                        <h3>Team in current tournament</h3>
                        <div className="list-container-3">
                            {
                                dataRunning.length 
                                ?   <ul>
                                        {teamsList}
                                    </ul> 
                                :    <h2> 
                                        No tournament stages currently running 
                                    </h2>
                            }
                            
                        </div>
                    </div>
                    <div className="home-box-5">
                        <h3>Past Matches</h3>
                        <div className="list-container-4">
                            <ul>
                                {pastMatchesList}
                            </ul>
                        </div>
                    </div>
                </div>
            )
            : <h1>Loading...</h1>
            }
        </div>
    )
   
}



export default Tournaments