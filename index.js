const items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

let currentTasks = []; 

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	const savedTasks = localStorage.getItem('toDoTasks'); 
    if (savedTasks) {
        return JSON.parse(savedTasks); 
    } else {
        return items;
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
        const items = getTasksFromDOM();
        saveTasks(items);
        currentTasks = items;
    });

	duplicateButton.addEventListener('click', function() {
        const itemName = textElement.textContent;
        const newItem = createItem(itemName);
        listElement.prepend(newItem);
        const items = getTasksFromDOM();
        saveTasks(items);
        currentTasks = items;
    });

	editButton.addEventListener('click', function() {
        textElement.setAttribute('contenteditable', 'true');
        textElement.focus();
    });

    textElement.addEventListener('blur', function() {
        textElement.setAttribute('contenteditable', 'false'); 
        const items = getTasksFromDOM();
        saveTasks(items);
        currentTasks = items;
    });

  return clone;
}

function getTasksFromDOM() {
    const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
    let tasks = [];
    
    itemsNamesElements.forEach(element => {
        const taskText = element.textContent;
        tasks = tasks.concat(taskText);
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

	const items = getTasksFromDOM();
	saveTasks(items);
    inputElement.value = '';
});

currentTasks = loadTasks();
currentTasks.forEach(item => {
    const newItem = createItem(item);
    listElement.append(newItem);
});