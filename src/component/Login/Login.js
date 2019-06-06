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
            const parsedResponse = await login.json();
            if (parsedResponse.success) {
                
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
            <div>
                <div>
                    <h1>
                        Sign in
                    </h1>
                </div>
                {     
                    logged 
                    ? <Redirect to={`/users/${this.props.currentUser._id}`}/>
                    : <form onSubmit={e => this.handleSubmit(e)}>
                        <label htmlFor="username">Username</label>
                        <input text="text" name="username" onChange={this.handleChange} value={username}/>
                        <label htmlFor="password">Password</label>
                        <input text="password" name="password" onChange={this.handleChange} value={password}/>
                        <button type="submit"> Submit</button>
                        {message}
                    </form>
                }
            </div>
         );
    }
}
 
export default Login;

