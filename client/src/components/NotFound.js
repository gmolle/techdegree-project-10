import React from "react";
import { Link } from "react-router-dom";

// Component for 404 errors
const NotFound = () => {
  return (
    <div className="container">
      <h1>Not Found</h1>
      <h3>Sorry! We could not find the page you're looking for.</h3>
      <Link to={`/`}>
        <div className="">Return to home page</div>
      </Link>
    </div>
  );
};

export default NotFound;
