var express = require('express'),
	bodyParser = require('body-parser'),
	app = express();

var todoRoutes = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/todos', todoRoutes);


app.get('/', function(req, res){
	res.send("Hello From Root route");
});


app.listen(3000, function() { 
  console.log('Todo API listening on port 3000.'); 
});