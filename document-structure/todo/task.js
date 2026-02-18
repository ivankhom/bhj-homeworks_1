const tasksList = document.getElementById('tasks__list');
const taskInput = document.getElementById('task__input');
const tasksForm = document.getElementById('tasks__form');

function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  
  if (savedTasks) {
    const tasks = JSON.parse(savedTasks);
    tasks.forEach(task => {
      createTaskElement(task);
    });
  }
}

function saveTasks() {
  const tasks = [];
  const taskElements = document.querySelectorAll('.task__title');
  
  taskElements.forEach(element => {
    tasks.push(element.textContent);
  });
  
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTaskElement(taskText) {
  const task = document.createElement('div');
  task.className = 'task';
  
  const taskTitle = document.createElement('div');
  taskTitle.className = 'task__title';
  taskTitle.textContent = taskText;
  
  const taskRemove = document.createElement('a');
  taskRemove.href = '#';
  taskRemove.className = 'task__remove';
  taskRemove.innerHTML = '&times;';
  
  taskRemove.addEventListener('click', (event) => {
    event.preventDefault();
    task.remove();
    saveTasks();
  });
  
  task.appendChild(taskTitle);
  task.appendChild(taskRemove);
  
  tasksList.appendChild(task);
}

tasksForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const taskText = taskInput.value.trim();
  
  if (taskText.length > 0) {
    createTaskElement(taskText);
    saveTasks();
    taskInput.value = '';
  }
});

loadTasks();