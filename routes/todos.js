var express = require('express');
var router = express.Router();
var db = require('../models');

// get all todos
router.get('/', function(req, res){
	db.Todo.find()
	.then(function(todos){
		res.json(todos);
	})
	.catch(function(err){
		res.send(err);
	})
}); 

// create todos
router.post('/', function(req, res){
	db.Todo.create(req.body)
	.then(function(newTodo){
		res.status(201).json(newTodo);
	})
	.catch(function(err){
		res.send(err);
	})
});

// get individual todos
router.get('/:todoId', function(req, res){
	db.Todo.findById(req.params.todoId)
	.then(function(foundTodo){
		res.json(foundTodo);
	})
	.catch(function(err){
		res.send(err);
	})
})

// update
router.put('/:todoId', function(req, res){
	db.Todo.findOneAndUpdate({ _id: req.params.todoId}, req.body, {new: true})
	.then(function(todo){
		res.json(todo);
	})
	.catch(function(err){
		res.send(err);
	})
})

// delete
router.delete('/:todoId', function(req, res){
	db.Todo.deleteOne({_id: req.params.todoId})
	.then(function(todo){
		res.json({ message: "To do deleted"});
	})
	.catch(function(err){
		res.send(err);
	})
})



module.exports = router;