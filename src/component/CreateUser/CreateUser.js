import React, { Component } from 'react';

import { Redirect } from "react-router-dom"

class CreateUser extends Component {
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
            const createUser = await fetch("/login/new", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(this.state),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedResponse = await createUser.json();
            console.log(parsedResponse)
            if (parsedResponse.success) {
                console.log(parsedResponse)
                this.props.setCurrentUser(parsedResponse.newUser)
                console.log(this.props.setCurrentUser(parsedResponse.newUser))
                this.setState({
                    logged: true
                })
            }
        } catch (error) {
            console.log(error)
        }
      
    }

    
    render() { 
        console.log(this.state)
        const { username, password, logged } = this.state
        return ( 
            <div>
                {
                    logged
                        ? <Redirect to={`/users/${this.props.currentUser._id}`}/>
                        : <RegisterForm
                            handleChange = {this.handleChange}
                            handleSubmit = {this.handleSubmit}
                            username = {username}
                            password = {password}
                        />
                }
            </div>
            
         );
    }
}
 const RegisterForm = ({handleChange, handleSubmit, username, password}) =>
    <form onSubmit={e => handleSubmit(e)}>
    <label htmlFor="username">Username</label>
    <input type="text" name="username" onChange={handleChange} value={username}/>
    <label htmlFor="password">Password</label>
    <input type="password" name="password" onChange={handleChange}value={password}/>
    <button type="submit">SUBMIT </button>
    </form>

export default CreateUser;