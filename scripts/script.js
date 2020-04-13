'use strict';

let todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed'),
    btn = document.querySelector('.header-button');

let todoData = [];

for(let key of Object.keys(localStorage)) {
    todoData.push({
        value: key,
        completed: localStorage.getItem(key) === 'false' ? false : true 
    });
}

function render() {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function (item, index) {
        let li = document.createElement('li');

        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
                        '<div class="todo-buttons">' +
                            '<button class="todo-remove"></button>' +
                            '<button class="todo-complete"></button>' +
                        '</div>';
              
        if(item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        let btnTodoCompleted = li.querySelector('.todo-complete'),
            btnRemove = li.querySelector('.todo-remove');

        btnTodoCompleted.addEventListener('click', function() {
            item.completed = !item.completed;

            localStorage.setItem(item.value, item.completed);

            render();
        });

        btnRemove.addEventListener('click', function(index) {
            localStorage.removeItem(item.value);

            todoData.splice(index, 1);

            render();
        });
    });
};

btn.disabled = true;

headerInput.addEventListener('input', function(event) {
    if(event.target.value === '') {
        btn.disabled = true;
    } else {
        btn.disabled = false;
    }
});

todoControl.addEventListener('submit', function(e) {
    e.preventDefault();

    let newTodo = {
        value: headerInput.value,
        completed: false
    };

    localStorage.setItem(newTodo.value, newTodo.completed);

    todoData.push(newTodo);

    headerInput.value = '';
    btn.disabled = true;

    render();
});

if(todoData.length > 0) {
    render();
}
