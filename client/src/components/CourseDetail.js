import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Consumer } from "./Context";
import axios from 'axios';
import ReactMarkdown from "react-markdown";


export default class CourseDetail extends Component {
  constructor() {
    super();
    this.state = {
      course: {},
      user: {},
      isCourseOwner: false,
    };
  }

  // Make GET request for course data when component mounts
  componentDidMount() {
    fetch(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(responseData => {
        // User response data to update component state
        this.setState({
          course: responseData.course,
          user: responseData.course.user
        });
      })
      .catch(error => {
        if (error) {
          const { history } = this.props;
          history.push("/notfound");
        }
      });
  }


  render() {
    const { id, title, description, estimatedTime, materialsNeeded } = this.state.course;
    const { firstName, lastName } = this.state.user;
    const courseOwner = `${firstName} ${lastName}`;

    return (
      <div>
        <Consumer>
          {({ username, password, userId }) => {

            // Check if logged in user matches course owner
            const isCourseOwner = () => {
              const ownerId = this.state.course.userId;
              const authenticatedUserId = userId;

              if (ownerId === authenticatedUserId) {
                return true;
              } else {
                return false;
              }
            }


            // Delete course
            const handleDeleteCourse = () => {
              if (isCourseOwner()) {
                // Send DELETE request to REST API with credentials
                axios({
                  method: "delete",
                  headers: {
                    "content-type": "application/json"
                  },
                  url: `http://localhost:5000/api/courses/${
                    this.props.match.params.id
                    }`,
                  auth: {
                    username: username,
                    password: password
                  }
                })
                  .then(() => {
                    const { history } = this.props;
                    history.push("/");
                  })
                  .catch(() => {
                    const { history } = this.props;
                    history.push("/error");
                  });
              } else {
                const { history } = this.props;
                history.push("/forbidden");
              }
            }


            return (
              <div className="details-subheader">
                <div className="container">
                  <div className="subheader-flex">
                    <ul className="button-list">
                      <li
                        className="button primary"
                        style={{ display: isCourseOwner() ? 'block' : 'none' }}
                      >
                        <Link to={`/courses/${id}/update`}>
                          <div className="button-text">Update Course</div>
                        </Link>
                      </li>
                      <li
                        className="button primary"
                        style={{ display: isCourseOwner() ? 'block' : 'none' }}
                      >
                        <button
                          onClick={handleDeleteCourse}
                          className="button primary"
                        >
                          <div>Delete Course</div>
                        </button>
                      </li>
                      <li className="button secondary">
                        <Link to={`/`}>
                          <div className="button-text">
                            <span className="returnBtn">Return to List</span>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            );
          }}
        </Consumer>

        <div className="container page-main">
          <div className="page-left">
            <h4>Course</h4>
            <h1>{title}</h1>
            <h4>By {courseOwner}</h4>
            <ReactMarkdown source={description} />
          </div>
          <div className="page-right">
            <h5>Estimated Time</h5>
            <p className="time">{estimatedTime}</p>
            <h5>Materials Needed</h5>
            <ReactMarkdown className="materials" source={materialsNeeded} />
          </div>
        </div>
      </div>
    );
  }
}

