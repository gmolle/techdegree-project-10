import React from "react";
import { Link } from "react-router-dom";

// Component for letting the user know that
// they can't access the requested page.
const Forbidden = () => {
  return (
    <div className="container">
      <h1>Forbidden</h1>
      <h3>Sorry! You can't access this page.</h3>
      <Link to={`/`}>
        <div className="">Return to home page</div>
      </Link>
    </div>
  );
};

export default Forbidden;
