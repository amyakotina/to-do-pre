const initialize_items = Object.freeze([
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
]);

let items; 

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	const savedTasks = localStorage.getItem('toDoTasks'); 
    if (savedTasks) {
        return JSON.parse(savedTasks); 
    } else {
        return initialize_items;
    }
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
    const textElement = clone.querySelector(".to-do__item-text");
    const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
    const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
    const editButton = clone.querySelector(".to-do__item-button_type_edit");

    textElement.textContent = item;
  
    deleteButton.addEventListener('click', function() {
        clone.remove();
        const currentTasks = getTasksFromDOM(); 
        saveTasks(currentTasks);
        items = currentTasks; 
    });

	duplicateButton.addEventListener('click', function() {
        const itemName = textElement.textContent;
        const newItem = createItem(itemName);
        listElement.prepend(newItem);
        const currentTasks = getTasksFromDOM(); 
        saveTasks(currentTasks);
        items = currentTasks; 
    });

	editButton.addEventListener('click', function() {
        textElement.setAttribute('contenteditable', 'true');
        textElement.focus();
    });

    textElement.addEventListener('blur', function() {
        textElement.setAttribute('contenteditable', 'false'); 
        const currentTasks = getTasksFromDOM(); 
        saveTasks(currentTasks);
        items = currentTasks; 
    });

    return clone;
}

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
    const tasks = [];
    
    itemsNamesElements.forEach(element => {
        const taskText = element.textContent;
        tasks[tasks.length] = taskText;
    });
    
    return tasks; 
}

function saveTasks(tasks) {
	localStorage.setItem('toDoTasks', JSON.stringify(tasks));
}

formElement.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskText = inputElement.value.trim(); 
    if (taskText === '') {
        return;
    }
    const newTaskElement = createItem(taskText);
    listElement.prepend(newTaskElement); 

    const currentTasks = getTasksFromDOM(); 
    saveTasks(currentTasks);
    items = currentTasks;

    inputElement.value = '';
});

items = loadTasks();
items.forEach(item => {
    const newItem = createItem(item);
    listElement.append(newItem);
});