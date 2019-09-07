import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Consumer } from "./Context";


const Header = () => {
  return (
    <Consumer>
      { ({ signedIn, name }) => {

				// Use Provider's signedIn state to define variables for NavLinks
				let linkOne = signedIn ? '' : '/signup';
				let linkTwo = signedIn ? '/signout' : '/signin';
				let textOne = signedIn ? `Welcome, ${name}` : 'Sign Up';
				let textTwo = signedIn ? 'Sign Out' : 'Sign In';

        return (
          <header>
            <div className="container header-container">
							<Link to={'/courses'} className="home">Courses</Link>
              <nav className="main-nav">
                <ul>
                  <li>
                    <NavLink to={linkOne}>{textOne}</NavLink>
                  </li>
                  <li>
                    <NavLink to={linkTwo}>{textTwo}</NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
        );
      }}
    </Consumer>
  );
};

export default Header;
