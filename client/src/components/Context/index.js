import React, { Component } from "react";
import axios from 'axios';
const CoursesContext = React.createContext();


export class Provider extends Component {
	
	constructor() {
		super();
		this.state = {
			signedIn: false,
			username: '',
			password: '',
			name: '',
			userId: null
		};
	} 


	// Sign user in
	handleSignIn = (clientUsername, clientPassword, props) => {
		axios({
			method: 'get',
			url: 'http://localhost:5000/api/users',
			responseType: 'json',
			auth: {
				username: clientUsername,
				password: clientPassword
			}
		})
			.then( response => {
				let user = response.data;
				let fullName = `${user.firstName} ${user.lastName}`;
				this.setState({
          signedIn: true,
          username: user.emailAddress,
          password: clientPassword,
          name: fullName,
          userId: user.id
				});
				
				// Set user login credentials for browser localStorage
				// localStorage.setItem('storageUsername', user.emailAddress);
				// localStorage.setItem('storagePassword', clientPassword);
			})
			.catch(error => {
				// If problem with authentication
				if (error.response.status === 401) {
					const { history } = props;
					history.push("/error");
				}
			});

			// Send user back to home page after log in
			const { history } = props;
			history.push('/');
	}


	// Sign user out
	handleSignOut = () => {
		this.setState({
      signedIn: false,
      username: "",
      password: "",
			name: "",
			userId: null
		});
		
		// Remove user login credentials from browser localStorage
		// localStorage.clear();
	}


  render() {
		// console.log(`CONTEXT STATE`);
		// console.log(`SIGNED IN: ${this.state.signedIn}`);
		// console.log(`USERNAME: ${this.state.username}`);
		// console.log(`PASSWORD: ${this.state.password}`);
		// console.log(`FULL NAME: ${this.state.name}`);
		// console.log(`USER ID: ${this.state.userId}`);

    return (
      <CoursesContext.Provider
        value={{
          signedIn: this.state.signedIn,
          username: this.state.username,
          password: this.state.password,
          name: this.state.name,
          userId: this.state.userId,
          actions: {
            signIn: this.handleSignIn,
            signOut: this.handleSignOut
          }
        }}
      >
        {this.props.children}
      </CoursesContext.Provider>
    );
  }  
}

export const Consumer = CoursesContext.Consumer;