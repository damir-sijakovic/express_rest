import authenticateJwt from './middlewares/authenticateJwt.js';
import bodyParser from "body-parser";
import express from 'express';

import UsersController from './controllers/users.js';
import PostsController from './controllers/posts.js';

const routes = async (app) => {
	
	//ROOT ROUTE - / 
	app.use(bodyParser.json());	
	app.get("/", (req, res) => res.status(200).json({ hello: "Run /src/test.html for testing..." }));

	//USERS ROUTE - /users
	const usersRoute = express.Router();
	const usersController = await UsersController(); 	

	usersRoute.get('/', usersController.getAll);
	usersRoute.post('/register', usersController.register);
	usersRoute.post('/login', usersController.login);

	app.use("/users", usersRoute);

	//POSTS ROUTE - /posts
	const postsRoute = express.Router();
	const postsController = await PostsController(); 	

	postsRoute.get('/', authenticateJwt, postsController.getAll);
	postsRoute.get('/id/:id', postsController.getById);
	postsRoute.post('/create', authenticateJwt, postsController.create);
	
	app.use("/posts", postsRoute);

}

export default routes;



