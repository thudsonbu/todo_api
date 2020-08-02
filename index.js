var express = require('express'),
	bodyParser = require('body-parser'),
	app = express();

var todoRoutes = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));


app.get('/', function(req, res){
	res.sendFile("index.html");
});

app.use('/api/todos', todoRoutes);

app.listen(3000, function() { 
  console.log('Todo API listening on port 3000.'); 
});