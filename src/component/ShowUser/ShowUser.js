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
    deleteToWatchList = async (id,) => {
       
        try {
            const deleteWatchList = await fetch(`/users/watchlist/${id}`, {
                credentials: "include",
                method: 'DELETE'
              
            });
            const deletedWatchList = await deleteWatchList.json();
            this.setState({
                user: {
                    username: deletedWatchList.foundUser.username,
                    watchList: deletedWatchList.foundUser.watchList
                }
            });
    
        } catch(err) {
          console.log(err, ' error')
        }
    }




    render() { 
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