import React, { Component } from 'react';
import { Link } from "react-router-dom";

// Import components
import CourseCard from "./CourseCard";


export default class Courses extends Component {

  constructor() {
		super();
		this.state = {
			courses: []
		};
	} 

	componentDidMount() {
		fetch('http://localhost:5000/api/courses')
		.then(response => response.json())
		.then(responseData => {
			this.setState({ 
				courses: responseData.courses 
			});
		})
		.catch( () => {
			const { history } = this.props;
			history.push('/error');
		});
	}


	render() {
		// Assign variable for list of current courses
		let currentCourses;

		// Update array using courses in component state
		currentCourses = this.state.courses.map( course => (
			<CourseCard
				id={course.id}
				key={course.id}
				title={course.title}
			/>
		));

		return (
      <div className='container'>
        <ul className="course-list">
          {currentCourses}
					{/* Display 'Add New Course' card */}
          <li className="course-card" id='new-course-card'>
            <Link to={`/courses/create`}>
              <div className='new-course-card-title'>Add New Course</div>
            </Link>
          </li>
        </ul>
      </div>
    );
	}
};