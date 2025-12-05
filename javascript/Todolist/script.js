const addTaskButton = document.getElementById("add-task");
const addTaskDialog = document.getElementById("add-task-dialog");
const addTaskForm = document.getElementById("add-task-form");
const closeAddTaskModalButton = document.getElementById(
  "close-add-task-dialog"
);
const closeEditTaskModalButton = document.getElementById(
  "close-edit-task-dialog"
);
const tasksContainer = document.getElementById("tasks-container");
const addTaskFormCancelButton = document.getElementById("add-task-form-cancel");
const editTaskFormCancelButton = document.getElementById(
  "edit-task-form-cancel"
);
const editTaskButton = document.getElementsByClassName("edit-task-button");
const editTaskDialog = document.getElementById("edit-task-dialog");
const editTaskForm = document.getElementById("edit-task-form");
const editTaskFormDataFields = document.getElementById("edit-task-form-fields");

class Task {
  constructor(title, description, status = "New") {
    this.id = crypto.randomUUID();
    this._title = title;
    this._description = description;
    this._status = status;
  }

  get title() {
    return this._title;
  }

  get description() {
    return this._description;
  }

  get status() {
    return this._status;
  }

  set title(value) {
    this._title = value;
  }
  set description(value) {
    this._description = value;
  }

  set status(value) {
    this._status = value;
  }
}

let dummyTask = new Task("Dummy Task", "Dummy Task Description");
let taskList = [dummyTask];
renderTaskCards();

//#region Add Task form event listeners
addTaskButton.addEventListener("click", () => {
  addTaskDialog.showModal();
});

closeAddTaskModalButton.addEventListener("click", () => {
  addTaskDialog.close();
});

addTaskFormCancelButton.addEventListener("click", () => {
  closeAddTaskForm();
});

addTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let taskTitle = document.querySelector('input[label="title"]').value;
  let taskDescription = document.querySelector(
    'textarea[label="description"]'
  ).value;
  console.log("adding task");
  addTaskToTaskList(taskTitle, taskDescription);

  closeAddTaskForm();
});
//#endregion

//#region Edit Task form event listeners
editTaskFormCancelButton.addEventListener("click", (e) => {
  closeEditTaskForm();
});

closeEditTaskModalButton.addEventListener("click", () => {
  closeEditTaskForm();
});

tasksContainer.addEventListener("click", (e) => {
  let task_list_item = e.target.closest("li");
  if (!task_list_item) return;

  let task_id = task_list_item.dataset.taskId;
  const taskIdx = taskList.findIndex((task) => task.id == task_id);
  const task = taskList[taskIdx];
  editingTaskId = task.id;

  // Create DOM element to display data
  editTaskDialog.showModal();

  editTaskFormDataFields.innerHTML = "";
  let editFormDOM = `
    Task Title: <input data-task-id="${task.id}" label="title" placeholder="Add task name" value="${task.title}"/>
    Task Description: <textarea label="description" placeholder="Add task description">${task.description}</textarea>
  `;

  editTaskFormDataFields.innerHTML += editFormDOM;
});

editTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let form = e.currentTarget;

  const task_id = form.querySelector('input[label="title"]').dataset.taskId;
  const title = form.querySelector('input[label="title"]').value;
  const description = form.querySelector('textarea[label="description"]').value;

  let task = taskList.find((task) => task.id == task_id);

  task.description = description;
  task.title = title;

  renderTaskCards();
  closeEditTaskForm();
});
//#endregion

function addTaskToTaskList(taskTitle, taskDescription) {
  let task = new Task(taskTitle, taskDescription);

  taskList = [...taskList, task];

  // Tightly coupled, for small scale like this its okay
  // but for large scale apps consider callbacks
  renderTaskCards();
}

function renderTaskCards() {
  tasksContainer.innerHTML = "";
  for (let idx = 0; idx < taskList.length; idx++) {
    let task = taskList[idx];
    let taskCard = `
        <li data-task-id="${task.id}" class="task-card">
            <div class="task-card-header">
              <span class="task-title">${task.title}</span>
              <button id="edit-task-${task.id}" class="edit-task-button">✏️</button>
            </div>
            <span class="task-description">${task.description}</span>
            <span class="task-status">Status: ${task.status}</span>
        </li>
        `;
    tasksContainer.innerHTML += taskCard;
  }
}

//#region Helper functions
function closeAddTaskForm() {
  addTaskForm.reset();
  addTaskDialog.close();
}

function closeEditTaskForm() {
  editTaskForm.reset();
  editTaskDialog.close();
  editingTaskId = null;
}
//#endregion
