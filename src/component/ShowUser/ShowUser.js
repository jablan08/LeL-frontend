import React, { Component } from 'react';
import { withRouter } from "react-router-dom"


class ShowUser extends Component {

    state = { 
        user: {}

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



    render() { 
        return ( 
             <div>
                <h1>{this.state.user.username}</h1>
                <h1>{this.state.user.password}</h1>
            </div>
         );
    }
}
 
export default withRouter(ShowUser)