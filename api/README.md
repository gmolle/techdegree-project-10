# Project 9 - Full Stack JavaScript Techdegree

### REST API
A REST API that lets users create, list, update and delete items from a school database.

---

<!-- <img src="https://res.cloudinary.com/dtqevfsxh/image/upload/v1558622280/portfolio/library-book-database.png" width="899px"> -->

## View project
1. Download this repo.
2. Navigate to the project directory in the command line/terminal.
3. Run 'npm install' (or view the required dependencies listed in the package.json file and install each manually).
4. Run 'npm seed' to seed the SQLite database.
5. Run 'npm start' to start the application. (To test the Express server, browse to the URL: http://localhost:5000/)
6. Use [Postman](https://www.getpostman.com/) for thorough route testing.

<!-- TODO: Set up live version using Heroku -->

<!-- :mag: Live version available at [nickhericks.github.io/techdegree-project-6/](https://nickhericks.github.io/techdegree-project-6/) -->

## Project objective
In this project, I created a REST API using Express. The API provides a way for users to administer a school database containing information about courses: users can interact with the database by retrieving a list of courses, as well as adding, updating and deleting courses in the database. Users are required to create an account and log-in to make changes to the database.

To complete this project, I used my knowledge of REST API design, Node.js, and Express to create API routes, along with the Sequelize ORM for data modeling, validation, and persistence. I used Postman to test explore and test routes during the development process. (The `RESTAPI.postman_collection.json` file is a collection of Postman requests used to test and explore the REST API.)

## Techniques and tools
- REST API design
- Node.js
- Express.js
- Sequelize ORM
- DB Browser for SQLite (viewing SQLite database tables)
- express-validator (database validation)
- bcryptjs (password hashing)
- basic-auth (parsing authorization header)
- Postman (REST API route testing)

## Code example
The POST '/api/courses' 201 route creates a course, sets the Location header to the URI for the course, and returns no content. express-validator is used for the data validation. The `authenticateUser` function authenticates the user sending the request. After adding the course successfully, the Location header is set to the URI for the new course.

```javascript
router.post('/', [
  check('title')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for "title"'),
  check('description')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for "description"'),
  ],
  authenticateUser, asyncHandler( async (req, res) => {
    // Attempt to get the validation result from the Request object.
    const errors = validationResult(req);

    // If there are validation errors...
    if (!errors.isEmpty()) {
      // Use the Array `map()` method to get a list of error messages.
      const errorMessages = errors.array().map(error => error.msg);
      // Return the validation errors to the client.
      return res.status(400).json({ errors: errorMessages });
    } else {

      // get the user from the request body.
      const course = req.body;

      // Create user
      const addedCourse = await Course.create({
        title: course.title,
        description: course.description,
        userId: req.currentUser.id
      });

      // get new course id for Location header
      const id = addedCourse.id;

      // Set the status to 201 Created, set Location header, and end the response.
      res.location(`/api/courses/${id}`).status(201).end();
    }
  }
));
```

## Acknowledgements
This project was built as part of the [Full Stack JavaScript Techdegree](https://join.teamtreehouse.com/techdegree/) offered by [Treehouse](https://teamtreehouse.com) :raised_hands:

Also, a big thank you to the creators and maintainers of [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/). 👍