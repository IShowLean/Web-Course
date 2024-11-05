document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskContainer = document.getElementById('taskContainer');
    const saveButton = document.getElementById('saveTasks');
    const loadButton = document.getElementById('loadTasks');

    let tasks = [];

    if (tasks.length !== 0) {
        taskContainer.classList.add('has-tasks');
    } else {
        taskContainer.classList.remove('has-tasks');
    }

    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const taskText = taskInput.value.trim();
        addTask(taskText);
        taskInput.value = '';
    });

    function addTask(text) {
        const task = {
            id: Date.now(),
            text: text,
            completed: false
        };
        tasks.push(task);
        renderTasks();
    }

    function renderTasks() {
        taskContainer.innerHTML = '';

        if (tasks.length === 0) {
            taskContainer.classList.remove('has-tasks');
        } else {
            taskContainer.classList.add('has-tasks');
        }

        tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.classList.add('task-item');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => {
                task.completed = checkbox.checked;
                renderTasks();
            });

            const taskText = document.createElement('span');
            taskText.textContent = task.text;
            if (task.completed) {
                taskText.classList.add('task-completed');
            }

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '✖';
            deleteButton.addEventListener('click', () => {
                tasks = tasks.filter(t => t.id !== task.id);
                renderTasks();
            });

            taskItem.appendChild(checkbox);
            taskItem.appendChild(taskText);
            taskItem.appendChild(deleteButton);

            taskContainer.appendChild(taskItem);
        });
    }

    saveButton.addEventListener('click', () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        alert('Задачи сохранены!');
    });

    loadButton.addEventListener('click', () => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) {
            tasks = savedTasks;
            renderTasks();
            alert('Задачи загружены!');
        } else {
            alert('Сохраненные задачи не найдены.');
        }
    });
});

(function () {
    const currentPath = window.location.pathname;
    const menuItems = document.querySelectorAll('.nav-menu a.nav');

    menuItems.forEach(function (menuItem) {
        const href = menuItem.getAttribute('href');
        if (currentPath.includes(href)) {
            menuItem.classList.add('active');
        }
    });
})();

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

menuButton.addEventListener("click", function () {
    navMenu.classList.toggle("open");
});

