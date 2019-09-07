import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Consumer } from "./Context";
import axios from "axios";

class UpdateCourse extends Component {
  constructor() {
    super();
    this.state = {
			title: '',
			description: '',
			estimatedTime: '',
			materialsNeeded: '',
			id: null,
			userId: null,
			firstName: '',
			lastName: '',
			emailAddress: '',
			errors: []
    };
	}
	
  componentDidMount() {
    fetch(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
			.then(response => response.json())
			.then(responseData => {
				// Make course data available in component state
				this.setState({
					title: responseData.course.title,
					description: responseData.course.description,
					estimatedTime: responseData.course.estimatedTime,
					materialsNeeded: responseData.course.materialsNeeded,
					id: responseData.course.id,
					userId: responseData.course.userId,
					firstName: responseData.course.user.firstName,
					lastName: responseData.course.user.lastName,
					emailAddress: responseData.course.user.emailAddress
				});
			})
			.catch((error) => {
				if (error) {
					const { history } = this.props;
					history.push("/notfound");
				}
			});
  }


   render() {
    return (
			<Consumer>
				{ ({ username, password, userId }) => {

					const { id, title, description, estimatedTime, materialsNeeded, firstName, lastName } = this.state;
					const courseOwner = `${firstName} ${lastName}`;

					// Update component state using input name and value
					const handleValueChange = e => {
						let name = e.target.name;
						let value = e.target.value;
						this.setState({
							[name]: value
						});
					};

					// On form submit, make PUT request to update course
					const handleSubmit = e => {
						e.preventDefault();

						// Remove any previous validation errors in component state
						this.setState({
							errors: []
						});

						// Send PUT request to update course
						axios({
              method: "put",
              url: `http://localhost:5000/api/courses/${id}`,
              responseType: "json",
              auth: {
								username: username,
								password: password
              },
              data: {
                title: title,
								description: description,
								estimatedTime: estimatedTime,
								materialsNeeded: materialsNeeded,
								userId: userId
              }
            })
						.then( () => {
              const { history } = this.props;
              history.push(`/courses/${id}`);
						})
						.catch(error => {
							// if user not signed in
							if (error.response.status === 401) {
								const { history } = this.props;
								history.push("/signin");
							}
							// if validation error (empty required fields)
							if (error.response.status === 400) {
								// update array of errors, use to display messages to user
								let errors = error.response.data.errors;
								let errorAlertMessages = errors.map(
									(error, index) => (
										<li className="validation-error" key={index}>
											{error}
										</li>
									)
								);
								// Update form validation errors in component state
								this.setState({ 
									errors: errorAlertMessages 
								});
							}
						});
					};


					return (
            <div className="container no-subheader">
              <form onSubmit={handleSubmit}>
                <h2>Update Course</h2>

                <ul>
									{this.state.errors}
								</ul>

                <div className="page-main">
                  <div className="page-left">
                    <h4>Course</h4>
                    <h1 className="field-container">
                      <input
                        name="title"
                        className="title"
                        type="text"
                        onChange={handleValueChange}
                        value={title}
                      />
                    </h1>
                    <h4>By {courseOwner}</h4>
                    <p className="field-container">
                      <textarea
                        id="description"
                        name="description"
                        rows="12"
                        onChange={handleValueChange}
                        value={description}
                      />
                    </p>
                  </div>
                  <div className="page-right">
                    <h5>Estimated Time</h5>
                    <p className="field-container">
                      <input
                        type="text"
                        name="estimatedTime"
                        onChange={handleValueChange}
                        value={estimatedTime}
                      />
                    </p>
                    <h5>Materials Needed</h5>
                    <p className="field-container">
                      <textarea
                        type="text"
                        name="materialsNeeded"
												rows="9"
                        onChange={handleValueChange}
                        value={materialsNeeded}
                      />
                    </p>
                  </div>
                </div>

                <ul className="button-list">
                  <li className="button primary">
                    <input type="submit" value="Update Course" />
                  </li>
                  <li className="button secondary">
                    <Link to={`/`}>
                      <div className="button-text">
                        <span className="blue">Cancel</span>
                      </div>
                    </Link>
                  </li>
                </ul>
              </form>
            </div>
          );
				}}
			</Consumer>
    );
  }
}

export default withRouter(UpdateCourse);