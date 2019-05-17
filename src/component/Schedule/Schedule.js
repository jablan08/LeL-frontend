import React, { Component } from 'react';
import { Link } from "react-router-dom";
import moment from "moment";
class Schedule extends Component {
    state = { 
        data: []
    }

    componentDidMount() {
        this.getUpcoming(this.state.matchId).then(allData => {
            this.setState({
                data: allData,
            })
        })
    }
    getUpcoming = async () =>{
        try {
            const upcomingMatch = await fetch(`/api/schedule`, {
                credentials: "include"
            })
            const upcomingMatchJson = await upcomingMatch.json()
            if(upcomingMatchJson.success){
                return upcomingMatchJson
              }
        } catch (error) {
            console.log(error)
        }
    }




    dateBegin = str =>
        new Date(str).toDateString();

    timeBegin = str => 
        moment(new Date(str).toTimeString().split("G")[0],"hh,mm,ss").format("h:mm A");



    render() { 
        const { data } = this.state
        return ( 
            <div className="list-container-1">
                {
                    data.schedules
                    ? data.schedules.map((match,i)=>
                        <div key={i}>
                            <div>
                                <Link to={`/match/${match.id}`} className="links">
                                    <h4>{match.name}</h4>
                                </Link>
                                <h6>{this.dateBegin(match.begin_at)}</h6>
                                <h6>{this.timeBegin(match.begin_at)}</h6>
                            </div>
                            {
                                match.opponents.map((opponent, i)=>
                                    <div key={i}>
                                        <li>
                                            <Link to={`/teams/${opponent.opponent.id}`} className="links">
                                                {opponent.opponent.name} <br/>
                                                <img src={opponent.opponent.image_url} width="100" height="100"alt=""/>
                                            </Link>
                                            <h6>WINS:{match.results[i].score}</h6>
                                        </li>
                                    </div>
                                )
                            }
                        </div>
                    )
                    : <h2>Loading...</h2>
                }

            </div>
         );
    }
}
 
export default Schedule;
