import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import WatchList from "../WatchList/WatchList"


class ShowUser extends Component {

    state = { 
        user: {
            username: "",
            watchList: ""
        }
    }
    componentDidMount() {
        this.doGetUser()
            .then(({user}) => this.setState({user}))
        }

    doGetUser = async () =>{
        try {
            const user = await fetch(`/users/${this.props.match.params.id}`)
            console.log(user)
            const parsedUser = await user.json();
            console.log(parsedUser)
            return parsedUser
        } catch (error) {
            console.log(error)
        }
    }
    deleteToWatchList = async (id, e) => {
        console.log(id, ' this is id')
        e.preventDefault();
        try {
            const deleteWatchList = await fetch(`/users/watchlist/${id}`, {
                credentials: "include",
                method: 'DELETE'
              
            });
            console.log('inside herrrrrr')
            const deletedWatchList = await deleteWatchList.json();
            console.log(deletedWatchList, "sent back")
            this.setState({
                user: {
                    watchList: this.state.user.watchList.filter((team,i)=> team.id !== id )   
                }
            });
    
        } catch(err) {
          console.log(err, ' error')
        }
    }

    // addTeamToWatch = async (team) => {
    //     // e.preventDefault();
        
    //     console.log(team)
    //     try {
    //         const addTeam = await fetch("/api/users/:id", {
    //             method: "POST",
    //             body: JSON.stringify(team),
    //             credentials: "include",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         });
    //         const parsedResponse = await addTeam.json();
    //         this.setState({
    //             user: [...this.state.user.watchList, parsedResponse.data]
                
    //         })


    //     } catch(err) {

    //     }

    // }




    render() { 
        console.log(this.state.user.watchList)
        console.log(this.state.user, "hittttt")
        const { username, watchList} = this.state.user
        return ( 
             <div>
                <h1>{username}</h1>

                {
                    watchList
                        ? watchList.length === 0 
                            ? <h3>Add to your Watch List!</h3>
                            : <WatchList deleteToWatchList={this.deleteToWatchList} watchList={watchList}/>
                    : <h2>Loading...</h2> 
                }
            </div>
         );
    }
}
 
export default withRouter(ShowUser)