//Get local value or set value
var getTodoList = () => {
    return JSON.parse(localStorage.getItem('TodoList')) || [];
}

//Parse list todo to json and save into localStorage by key 'TodoList'
var addNewTodo = (todo, checked) => {
    let todoList = getTodoList();
    todoList.push({todo: todo, checked: checked});
    localStorage.setItem('TodoList', JSON.stringify(todoList));
}

//Delete the item in array and save override localStorage value
var deleteTodo = (todoItem, checked) => {
    var todoList = getTodoList();
    let i=0;
    let pos;
    todoList.forEach(e => {
        if(e.todo === todoItem && e.checked === checked){
            pos = i;
        }
        i++;
    });
    todoList.splice(pos,1);
    localStorage.setItem('TodoList', JSON.stringify(todoList));
}

//change todo checked
var todoChecked = (todoItem, checked) => {
    var todoList = getTodoList();
    for (let i = 0; i < todoList.length; i++){
        if(todoList[i].todo === todoItem && todoList[i].checked === !checked){
            todoList[i].checked = checked;
            break;
        }
    }
    localStorage.setItem('TodoList', JSON.stringify(todoList));
}

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var addClose = () => {
    for (let i = 0; i < myNodelist.length; i++) {
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        myNodelist[i].appendChild(span);
    }
}

// Declare close button element
var close = document.getElementsByClassName("close");

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
    let todovalue = ev.target.innerText.slice(0, -1).replace(/\n/g, '');
    if(ev.target.getAttribute("class") === "checked"){
        todoChecked(todovalue, true);
    } else{
        todoChecked(todovalue, false);
    }
  }
}, false);

//Add a element into view
var createElement = (inputValue, checked) => {
    let li = document.createElement("li");
    let t = document.createTextNode(inputValue);
    if(checked){
        li.className += "checked";
    }
    li.appendChild(t);
    document.getElementById("myUL").appendChild(li);
    document.getElementById("myInput").value = "";

    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            let div = this.parentElement;
            if(div.getAttribute("class") === "checked"){
                deleteTodo(div.innerText.slice(0, -1).replace(/\n/g, ''), true);
            } else{
                deleteTodo(div.innerText.slice(0, -1).replace(/\n/g, ''), false);
            }
            
            div.style.display = "none";
        }
    }
}

// Create a new list item when clicking on the "Add" button
var newElement = () => {
    let inputValue = document.getElementById("myInput").value;
    if (inputValue === '') {
        alert("Viết gì đó đi mèy!!!");
    } else {
        addNewTodo(inputValue, false);
        createElement (inputValue, false);
    }
}

// Create a new list item when ENTER
document.getElementById('myInput').addEventListener('keypress', function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        newElement();
    }
});

//load storage value into view
var loadView = () => {
    let todoList = getTodoList();
    todoList.forEach(e => {
        createElement(e.todo, e.checked);
    });
}

loadView();