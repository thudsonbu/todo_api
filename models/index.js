var mongoose = require('mongoose');
mongoose.set('debug', true);

// Connect to mongoose database
mongoose.connect("mongodb://localhost:27017/todo-api", {useNewUrlParser: true, useUnifiedTopology: true});

// Promise 
mongoose.Promise = Promise;

// 
module.exports.Todo = require("./todo");