import React from "react";
import { Link } from "react-router-dom";

// Component for letting user know they can't access requested page.
const UnhandledError = () => {
  return (
    <div className="container">
      <h1>Error</h1>
      <h3>Sorry! We just encountered an unexpected error.</h3>
      <Link to={`/`}>
        <div className="">Return to home page</div>
      </Link>
    </div>
  );
};

export default UnhandledError;
