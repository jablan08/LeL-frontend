import React, { Component } from 'react';
import { Link }from "react-router-dom";
import moment from "moment";

class Match extends Component {
    state = { 
        data: [],
        matchId: window.location.pathname.split("/")[2],
    }


    componentDidMount() {
        this.getMatch(this.state.matchId).then(allData => {
            this.setState({
                data: allData,
            })
        })
    }

    getMatch = async (id) =>{
        try {
            const teamShow = await fetch(`/api/match/${id}`, {
                // body: JSON.stringify(this.state.data[0].id),
                credentials: "include"
            })
            const teamShowJson = await teamShow.json()
            if(teamShowJson.success){
                return teamShowJson
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

        const {data} = this.state
        console.log(data.match)
        return ( 
            <div>

                
                {
                    data.match
                    ? <div>
                        <h3>{data.match.league.name}</h3>
                        <img width="250" height="250"src={data.match.league.image_url } alt=""/>

                        <div>
                            
                                <h4>{data.match.name}</h4>
                           
                            <h6>{this.dateBegin(data.match.begin_at)}</h6>
                            <h6>{this.timeBegin(data.match.begin_at)}</h6>
                        </div>
                        {
                            data.match.opponents.map((opponent, i)=>
                                <li key={i}>
                                    <Link to={`/teams/${opponent.opponent.id}`}>
                                        {opponent.opponent.name} <br/>
                                        <img src={opponent.opponent.image_url} width="150" height="150"alt=""/>
                                    </Link>
                                    <h6>WINS:{data.match.results[i].score}</h6>
                                </li>
                            )
                        }
                        </div>
                    : <h2>Loading...</h2>
                }
            </div>
                
      
            
         );
    }
}
export default Match;