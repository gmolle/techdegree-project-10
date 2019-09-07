import React from "react";
import { Redirect } from "react-router-dom";
import { Consumer } from "./Context";

const AddPlayerForm = () => {

  return (
    <Consumer>
      { ({ actions }) => {

				// Run handleSignOut method from Provider in Context/index.js file
				actions.signOut();

        return (
          <Redirect to="/" />
        );
      }}
    </Consumer>
  );
};

export default AddPlayerForm;
