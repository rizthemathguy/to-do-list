document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('task-input');
  const addTaskButton = document.getElementById('add-task');
  const taskList = document.getElementById('task-list');

  // Load tasks from local storage
  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
      addTaskToDOM(task.text, task.completed);
    });
  };

  // Save tasks to local storage
  const saveTasks = () => {
    const tasks = [];
    document.querySelectorAll('li').forEach(taskElement => {
      tasks.push({
        text: taskElement.querySelector('.task-text').textContent,
        completed: taskElement.classList.contains('completed')
      });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  // Add task to the DOM
  const addTaskToDOM = (taskText, completed = false) => {
    const taskItem = document.createElement('li');
    taskItem.classList.toggle('completed', completed);

    const taskTextSpan = document.createElement('span');
    taskTextSpan.classList.add('task-text');
    taskTextSpan.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');

    deleteButton.addEventListener('click', () => {
      taskList.removeChild(taskItem);
      saveTasks();
    });

    taskTextSpan.addEventListener('click', () => {
      taskItem.classList.toggle('completed');
      saveTasks();
    });

    taskItem.appendChild(taskTextSpan);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
  };

  // Add task
  const addTask = () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
      addTaskToDOM(taskText);
      saveTasks();
      taskInput.value = '';
    }
  };

  addTaskButton.addEventListener('click', addTask);

  taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  });

  // Initial load
  loadTasks();
});
