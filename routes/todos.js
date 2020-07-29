var express = require('express');
var router = express.Router();
var db = require('../models');
var helpers = require('../helpers/todos');

// root route
router.route('/')
	// get all todos	
	.get(helpers.getTodos)
	// create todo
	.post(helpers.createTodo)

// get individual todos
router.route('/:todoId')
	// get todo
	.get(helpers.getTodo)
	// update todo
	.put(helpers.updateTodo)
	// delete todo
	.delete(helpers.deleteTodo)


module.exports = router;