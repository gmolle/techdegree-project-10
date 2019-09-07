import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Consumer } from "./Context";


export default class UserSignIn extends Component {

  // Create refs for input values
  emailAddress = React.createRef();
  password = React.createRef();


  render() {

    return (
      <Consumer>
        {({ actions }) => {

          // Attempt to sign user in
          const handleSubmit = e => {
            e.preventDefault();

            // Use form values to sign in
            actions.signIn(
              this.emailAddress.current.value,
              this.password.current.value,
              this.props
            );
          };

          return (
            <div className="middle-section">
              <h2>Sign In</h2>

              <form onSubmit={handleSubmit}>
                <div className="field-container">
                  <input
                    type="text"
                    ref={this.emailAddress}
                    placeholder="Email Address"
                    autoFocus
                  />
                  <input
                    type="password"
                    ref={this.password}
                    placeholder="Password"
                  />
                </div>

                <ul className="button-list">
                  <li className="button primary">
                    <input type="submit" value="Sign In" />
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
                Don't have a user account?{" "}
                <span>
                  <Link to={`/signup`}>
                    <span>Click here</span>
                  </Link>
                </span>{" "}
                to sign up!
							</p>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
