import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Consumer } from "./Context";
import axios from "axios";


export default class UserSignUp extends Component {

  constructor() {
    super();
    this.state = {
      errors: []
    };
  }

  // Create refs for input fields
  firstName = React.createRef();
  lastName = React.createRef();
  emailAddress = React.createRef();
  password = React.createRef();
  passwordConf = React.createRef();

  render() {
    return (
      <Consumer>
        {({ actions }) => {

          // When for is submitted
          const handleSubmit = e => {
            e.preventDefault();

            // Remove existing validation errors from component state
            this.setState({
              errors: []
            });

            // Assign values to variables
            const userFirstName = this.firstName.current.value;
            const userLastName = this.lastName.current.value;
            const userEmailAddress = this.emailAddress.current.value;
            const userPassword = this.password.current.value;
            const userPasswordConf = this.passwordConf.current.value;

            // Check password and passwordConf match
            if (userPassword !== userPasswordConf) {
              let passwordMatchValidation = <li className="validation-error" key="1000">Password value does not match Password Confirmation value</li>

              // Update errors array in component state if passwords don't match
              this.setState(prevState => ({
                errors: [
                  ...prevState.errors,
                  [passwordMatchValidation]
                ]
              }));
            } else {
              // send POST request to create new user
              axios({
                method: 'post',
                url: 'http://localhost:5000/api/users',
                data: {
                  firstName: userFirstName,
                  lastName: userLastName,
                  emailAddress: userEmailAddress,
                  password: userPassword
                }
              })
                .then(() => {
                  // After user is created, sign in new user
                  actions.signIn(
                    userEmailAddress,
                    userPassword,
                    this.props
                  );
                })
                .catch(error => {
                  if (error.response.status === 400) {
                    // if multiple errors return, it is due to input validation
                    if (error.response.data.errors) {
                      // update array of errors, use to display messages to user
                      let errors = error.response.data.errors;
                      let errorAlertMessages = errors.map(
                        (error, index) => (
                          <li className="validation-error" key={index}>
                            {error}
                          </li>
                        )
                      );

                      // Update component state with form validation errors
                      this.setState({
                        errors: errorAlertMessages
                      });

                    } else {
                      // Else, error is due to email already existing
                      // For security, do not tell user that email already exists
                      // Instead, route user to error page
                      const { history } = this.props;
                      history.push("/error");
                    }
                  }
                });
            }
          };


          return (
            <div className="middle-section">
              <h2>Sign Up</h2>

              <ul>
                {this.state.errors}
              </ul>

              <form onSubmit={handleSubmit}>
                <div className="field-container">
                  <input
                    type="text"
                    ref={this.firstName}
                    placeholder="First Name"
                    autoFocus
                  />
                  <input
                    type="text"
                    ref={this.lastName}
                    placeholder="Last Name"
                  />
                  <input
                    type="text"
                    ref={this.emailAddress}
                    placeholder="Email Address"
                  />
                  <input
                    type="password"
                    ref={this.password}
                    placeholder="Password"
                  />
                  <input
                    type="password"
                    ref={this.passwordConf}
                    placeholder="Confirm Password"
                  />
                </div>

                <ul className="button-list">
                  <li className="button primary">
                    <input type="submit" value="Sign Up" />
                  </li>
                  <li className="button secondary">
                    <Link to={`/`}>
                      <div className="button-text">
                        <span className="cancel">Cancel</span>
                      </div>
                    </Link>
                  </li>
                </ul>
              </form>

              <p>
                Already have a user account?{" "}
                <span>
                  <Link to={`/signin`}>
                    <span>Click here</span>
                  </Link>
                </span>{" "}
                to sign in!
							</p>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
