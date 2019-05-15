import React, { Component } from 'react';

class AllTeams extends Component {
    state = { 
        data: []
    }

    componentDidMount() {
        this.getTeams().then(allData => {
            console.log(allData)
            this.setState({
                data: allData
            })
        })
    }


    getTeams = async () => {
        try {
          const teams = await fetch(`/api/teams`)
            const teamsJson = await teams.json()
            if(teamsJson.success){
              return teamsJson
            }
        } catch (error) {
          console.log(error)
        }
    }
    render() { 
        console.log(this.state.data)
        return (
            <div>
                Hit
            </div>

        );
    }
}
 
export default AllTeams;


