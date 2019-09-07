import React from "react";
import { Link } from "react-router-dom";


const CourseCard = ({ id, title }) => {
  return (
    <li className="course-card" key={id}>
      <Link to={`/courses/${id}`}>
        <div className="">Course</div>
        <div className="course-card-title">{title}</div>
      </Link>
    </li>
  );
};

export default CourseCard;
