import React, { Component } from 'react';
import {Redirect} from "react-router-dom";


class Login extends Component {
    state = { 
        username: "",
        password: "",
        logged: false,
        message: ""

    }
    handleChange = (e) =>
        this.setState({
            [e.target.name]: e.target.value
    })

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const login = await fetch("/login", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(this.state),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log("HIT")
            const parsedResponse = await login.json();
            console.log(parsedResponse)
            if (parsedResponse.success) {
                console.log(parsedResponse)
                this.props.setCurrentUser(parsedResponse.user)
                this.setState({
                    logged: true,
                })
            } else {
                this.setState({
                    message: parsedResponse.message
                })
            }
        } catch (error) {
            console.log(error)
        }
      
    }
    render() { 
        const { username, password, logged, message } = this.state
        return ( 
            logged 
            ? <Redirect to={`/users/${this.props.currentUser._id}`}/>
            : <form onSubmit={e => this.handleSubmit(e)}>
                <input text="text" name="username" onChange={this.handleChange} value={username}/>
                <input text="password" name="password" onChange={this.handleChange} value={password}/>
                <button type="submit"> Submit</button>
                {message}
            </form>
         );
    }
}
 
export default Login;

