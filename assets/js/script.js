// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
  const timeStamp = new Date().getTime();
  const randomNumber = Math.floor(Math.random() * 100);
  const randomString = randomNumber.toString();
  const uniqueId = `${timeStamp}-${randomString}`;
  return uniqueId;
}
const uniqueId = generateTaskId();
console.log(uniqueId);

function task() {}

// Todo: create a function to create a task card
function createTaskCard(task) {
  const card = document.createElement("div");
  card.classList.add("task-card");

  const cardTitle = document.createElement("h3");
  cardTitle.textContent = task.title;

  const cardDescription = document.createElement("p");
  cardDescription.textContent = task.description;

  const cardDueDate = document.createElement("p");
  cardDueDate.textContent = `Due Date: ${task.dueDate}`;

  // appending the created elements to the end of the card
  card.appendChild(cardTitle);
  card.appendChild(cardDescription);
  card.appendChild(cardDueDate);

  return card;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  // maybe try jq
  const taskContainer = document.getElementById('task-container');
    taskList.forEach(task => { 
        const card = createTaskCard(task);
        card.setAttribute('draggable', true); 
        taskContainer.appendChild(card);
    });
    const cards = document.querySelectorAll('.task-card');
    cards.forEach(card => {
        card.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text', card.id);
        });
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();

    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const dueDate = document.getElementById('dueDate').value;

    const newTask = {
        id: generateTaskId(),
        title: title,
        description: description,
        dueDate: dueDate
    };

    taskList.push(newTask);

    localStorage.setItem('tasks', JSON.stringify(taskList));

    renderTaskList();

    document.getElementById('taskForm').reset();

    const modal = new bootstrap.Modal(document.getElementById('formModal'));
    modal.hide();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  const taskId = ui.draggable.attr("id");
  const taskIndex = taskList.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    taskList[taskIndex].status = newStatus;
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
  } else {
    console.error("Task not found.");
  }
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();
  $('#taskForm').submit(handleAddTask);
  $('.lane').droppable({
      drop: handleDrop
  });
  $('#dueDate').datepicker();
});
