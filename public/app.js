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
	newTodo.data('id', todo._id);
	if (todo.completed === true){
		newTodo.addClass("completed");
	}
	$('.list').append(newTodo);
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
    $(this).toggleClass("completed");
    e.stopPropagation();
});

// Click on trash to delete to do items
$("ul").on("click", "span",function(e) {
    // fade out element then remove when fade is complete
    $(this).parent().fadeOut(500, function () {
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

// // Creating new to do items
// $("input[id='bigInput']").keypress(function(e) {
//     if(e.which === 13){
//         let todoText = $(this).val();
//         // Clear input
//         $(this).val("");
//         $("ul[id='bigUl']").append("<li class='m-0 p-0'><span><i class='fa fa-trash trashIcon'></i></span> " + todoText + "</li>");
//     }
// });

// Fade in and out input
$(".fa-plus").click(function(){
    $("input[id='bigInput']").fadeToggle();
});


// $("li").click(function() {
//     if($(this).css("color") === "rgb(128, 128, 128)"){
//         $(this).css({
//             color:"black",
//             textDecoration: "none"
//         });
//     }
//
//     else {
//         $(this).css({
//             color:"gray",
//             textDecoration: "line-trough"
//         });
//     }
// });