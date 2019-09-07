import React, { Component } from 'react';
import { 
	BrowserRouter, 
	Route, 
	Switch, 
	Redirect
} from 'react-router-dom';


// Import components
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import UserSignOut from "./components/UserSignOut";
import UnhandledError from "./components/UnhandledError";
import Forbidden from './components/Forbidden';
import NotFound from './components/NotFound';


export default class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Header />

				<Switch>
					<Route exact path="/" render={ () => <Redirect to='/courses' />} />
					<Route exact path="/courses" component={Courses} />

					{/* PrivateRoute (Higher-Order Component) requiring user sign in for routes */}
					<PrivateRoute exact path="/courses/create" component={CreateCourse} />
					<PrivateRoute exact path="/courses/:id/update" component={UpdateCourse} />
					
					<Route exact path="/courses/:id" component={CourseDetail} />
					<Route exact path="/signin" component={UserSignIn} />
					<Route exact path="/signup" component={UserSignUp} />
					<Route exact path="/signout" component={UserSignOut} />

					<Route exact path="/error" component={UnhandledError} />
					<Route exact path="/forbidden" component={Forbidden} />
					<Route exact path="/notfound" component={NotFound} />

					{/* Catch all requested routes not defined above */}
					<Route component={NotFound} />
					
				</Switch>
			</BrowserRouter>
    );
	}
}
