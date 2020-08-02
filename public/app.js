// Get todo items on page load from api
$(document).ready(function(){
	$.getJSON("/api/todos")
	.then(addTodos)
	.catch(function(err){
		res.send(err);
	})
	
	// event listener for form input
	$('#todo-input').keypress(function(e){
		if(e.which === 13){ // this checks which key was pressed (13 is the enter key)
			// create a todo
			createTodo();
		}
	})
})

function addTodos(todos){
	// add Todos to the page
	todos.forEach(function(todo){
		addTodo(todo);
	});
}

function addTodo(todo){
	let newTodo = $("<li class='m-0 p-0'><span><i class='fa fa-trash trashIcon'></i></span> " + todo.name + "</li>")
		.hide().fadeIn(1000);
	newTodo.data('id', todo._id);
	newTodo.data('completed', todo.completed);
	if (todo.completed === true){
		newTodo.addClass("completed");
	}
	$('.todo-list').append(newTodo);
}

function createTodo(text){
	// get text from input field
	let userInput = $('#todo-input').val();
	// send request to create a new todo
	$.post('api/todos', { name: userInput })
	.then(function(newTodo){
		addTodo(newTodo);
		// clear input text
		$('#todo-input').val('');
	})
	.catch(function(err){
		console.log(err);
	})
}


// Check off to do items
$("ul").on("click", "li", function(e) {
	updateTodo($(this));
    e.stopPropagation();
});

function updateTodo(todo){
	let todoId = todo.data('id');
	let todoCompleted = todo.data('completed');
	let todoUrl = '/api/todos/' + todoId
	let todoData = !todoCompleted;
	$.ajax({
		url: todoUrl,
		method: 'PUT',
		data: 'completed=' + todoData
	})
	.then(function(){
		todo.toggleClass('completed');
		todo.data('completed', todoData);
	})
	.catch(function(e){
		console.log(e);
	})
}

// Click on trash to delete to do items
$("ul").on("click", "span",function(e) {
    // fade out element then remove when fade is complete
    $(this).parent().fadeOut(1000, function () {
        // removes parent element (li)
        $(this).remove();
    });
	// remove item from database
	let todoId = $(this).parent().data('id');
	console.log(todoId);
	$.ajax({
		method: 'DELETE',
		url: '/api/todos/' + todoId
	})
    e.stopPropagation();
});
