import React, { Component } from 'react';
import {Redirect} from "react-router-dom";


class Login extends Component {
    state = { 
        username: "",
        password: "",
        logged: false

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
            if (parsedResponse.success) {
                console.log(parsedResponse)
                this.props.setCurrentUser(parsedResponse.user)
                this.setState({
                    logged: true
                })
            }
        } catch (error) {
            console.log(error)
        }
      
    }
    render() { 
        const { username, password, logged } = this.state
        return ( 
            logged 
            ? <Redirect to={`/users/${this.props.currentUser._id}`}/>
            : <form onSubmit={this.handleSubmit}>
                <input text="text" name="username" onChange={this.handleChange} value={username}/>
                <input text="password" name="password" onChange={this.handleChange} value={password}/>
                <button type="submit"> Submit</button>
            </form>
         );
    }
}
 
export default Login;