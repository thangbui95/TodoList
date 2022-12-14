let addTask1 = document.querySelector('.addTask');
let content = document.querySelector('#content');

function getTaskArray() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
}

let tasks = getTaskArray();

const renderTasks = () => {
    let listTask = document.getElementById("result")
    
    if (tasks.length == 0) {
        listTask.innerHTML = '<p>Not yet have task</p>';
    } else {
        let content2 = '<ul>'
        
        tasks.forEach((task,index) => {
            content2 += `
                <li>
                    <div class="taskname">${task.name}</div>
                    <div class="buttonarea">
                        <button class="edit" onclick="editTask(${index})">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="delete" onclick="deleteTask(${index})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </li>
            `
            })

        content2 += '</ul>'
        listTask.innerHTML = content2
    }
}

renderTasks();

const addTask = () => {
    if (!content.value) {
        alert("vui long nhap task");
        return false;
    }
    let task = {name: content.value};
    let taskId = addTask1.getAttribute('id');
    if (taskId) {
        tasks[taskId] = task;
        addTask1.removeAttribute('id');
    } else {
        tasks.push(task);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    renderTasks();
}

const editTask = (id) => {
    content.value = tasks[id].name;
    addTask1.setAttribute('id', id);
}

const deleteTask = (id) => {
    tasks.splice(id, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

const clearTask = () => {
    localStorage.clear();
    tasks = [];
    renderTasks();
    content.value = ``;
}
