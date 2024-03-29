/**
 * author Anish Verma
 * version 1.0
 */

import { taskIdGen, taskManage } from "../utils/taskmanage.js";
import { showAlert } from "../utils/dialogbox.js";
import { Task } from "../model/task.js";
import aside from '../utils/sidemenu.js';
import { firebaseManage } from "../utils/firebaseManage.js";
import { validate } from "../utils/validation.js";
import {gLogout} from '../utils/login.js';

addEventListener('load', main);

export function main() {
    aside();
    getLoginDetails();
    showId();
    logout();
    showAlert();
    console.log('Task Manager is running');
    document.querySelector('#name').focus();
    document.querySelector('#add').addEventListener('click', addTask);
    document.querySelector('#delete').addEventListener('click', removeTask);
    document.querySelector('#update').addEventListener('click', updateTask);
    document.querySelector('#save').addEventListener('click', saveTask);
    document.querySelector('#savetodb').addEventListener('click', saveTaskToDB);
    document.querySelector('#load').addEventListener('click', loadTask);
    document.querySelector('#loaddb').addEventListener('click', loadFromDB);
    document.querySelector('#delete-all').addEventListener('click', deleteAllTask);
    document.querySelector('#search-btn').addEventListener('click', searchTasks);
    document.querySelector('#clear-search-btn').addEventListener('click', clearSearch);
    document.querySelector('#reset').addEventListener('click', clearEditForm);
    document.getElementById('print').addEventListener('click', printTasks);
}

// to display the time

(function () {
    const d = new Date();
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = {
        d: d.getDate(),
        m: d.getMonth(),
        y: d.getFullYear(),
        hrs: d.getHours(),
        min: d.getMinutes()
    }
    document.querySelector('#Date').innerHTML = `<i class="fa fa-calendar-days"></i> ${month[date.m]} ${date.d}, ${date.y}`;
    document.querySelector('#Time').innerHTML = `<i class="fa fa-clock"></i> ${date.hrs} : ${date.min}`;

})();

// to autogenerated unique id

const showId = () => {
    document.querySelector('#id').innerText = Date.now();
};

// to initialize all input fields

function initTaskFields() {
    let id = document.querySelector('#id').innerText;
    let name = document.querySelector('#name').value;
    let desc = document.querySelector('#desc').value;
    let date = document.querySelector('#date').value;
    return { id, name, desc, date };
}

// to display the login username

function getLoginDetails() {
    document.querySelector('#username').innerText = localStorage.userName;
}

function logout(){
    document.querySelector('#google-signout').addEventListener('click', gLogout);
}
// to add the tasks

function addTask() {
    let taskStatus = 'New';
    let taskMarked=false;
    let taskImportant=false;
    let taskField = initTaskFields();
    let nameField = document.querySelector('#name');
    const msg = validate.taskName(taskField.name, 'Enter valid task: e.g. Demo task or Task 1');
    if (document.querySelector('.alert')) {
        return;
    }
    else if (taskField.name === '') {
        showAlert().alertOpen('Please enter atleast Task');
        return;
    }
    else if (msg.length > 0) {
        document.querySelector('#errorTaskName').innerText = msg;
        nameField.focus();
        nameField.style.boxShadow = '0 0 2px 5px #e5a0a0';
        return;
    }
    else {
        document.querySelector('#errorTaskName').innerText = '';
    }
    const task = taskManage.add(taskField.id, taskField.name, taskField.desc, taskField.date, taskStatus,taskMarked,taskImportant);
    clearEditForm();
    displayTask(task);
    showId();
    return task;
}

// to remove the tasks

function removeTask() {
    let tasks = taskManage.delete();
    taskCounts();
    displayTasks(tasks);
}


// to save the tasks

function saveTask() {
    let row = document.querySelector('#task-field');
    if (!row.childNodes) {
        let text = 'Add some tasks';
        showAlert().alertDialog('alert-show', text, 'material-icons boundary', '&#xe5cd;', 'linear-gradient(var(--errorTxt1),var(--errorTxt1))');
    }
    else {
        taskManage.save();
        let text = 'Records has been saved successfully';
        showAlert().alertDialog('alert-show', text, 'material-icons boundary', '&#xe5cd;', 'null');
        return;
    }
}

// to save the tasks to database

function saveTaskToDB() {
    taskManage.saveToDB();
    let text = 'Records has been saved successfully in the database';
    showAlert().alertDialog('alert-show', text, 'material-icons boundary', '&#xe5cd;', 'null');
    return;
}

// to load the tasks
function loadTask() {
    if (localStorage) {
        let genTask = JSON.parse(localStorage.alltask);
        let tasks = genTask.map(
            (task) => new Task(task.id, task.name, task.desc, task.date, task.isMarked, task.isImportant, task.status)
        );
        taskManage.taskList = tasks;
        taskCounts();
        displayTasks(taskManage.taskList);
        let text = 'Records has been loaded successfully';
        showAlert().alertDialog('alert-show', text, 'material-icons boundary', '&#xe5cd;', 'null');
    }
    else {
        console.log('Task loading failed');
    }
}

// to load from Firestore database 
export async function loadFromDB() {
    const tasks = await taskManage.loadFromDB();
    displayTasks(tasks);
    let text = 'Records has been loaded successfully';
    showAlert().alertDialog('alert-show', text, 'material-icons boundary', '&#xe5cd;', 'null');
}


// to clear all the tasks in the table
function deleteAllTask(task) {
    let row = document.querySelector('#task-field');
    row.querySelectorAll('*').forEach((node) => node.remove());
    taskManage.deleteAll();
    taskCounts();
    let text = 'All records deleted successfully';
    showAlert().alertDialog('alert-show', text, 'material-icons boundary', '&#xe5cd;', 'null');
}


// to search the tasks

function searchTasks(event) {
    let textTofind = (document.querySelector('#search-bar').value || '').trim();
    let div = document.querySelector('#dialog');
    let p = document.querySelector('#right');
    if (!p) {
        p = document.createElement('p');
        p.id = 'right';
        div.appendChild(p);
    }

    let result, text;
    if (textTofind) {
        result = taskManage.search(textTofind);
        text = result.length ? 'Search results found' : 'Not found';
        p.innerText = text;
        displayTasks(result);
    } else {
        return 0;
    }
    event.preventDefault();
}

// to clear search

function clearSearch(event) {
    let input = document.querySelector('#search-bar').value = '';
    let allTasks = taskManage.taskList;
    displayTasks(allTasks);
    let text = document.querySelector('#right');
    text.remove();
    event.preventDefault();
}

// to mark the tasks

function markTask() {
    const icon = this;
    const id = icon.getAttribute('task-id');
    const row = icon.parentNode.parentNode;
    row.classList.toggle('marked');
    const trash = icon.classList.toggle('mrk');
    taskManage.mark(id);
    taskCounts();
}

// to important tasks

function importantTask() {
    const icon = this;
    const id = icon.getAttribute('task-id');
    icon.classList.toggle('important');
    taskManage.important(id);
    taskCounts();
}

// to fill the fields to edit tasks

function fillTaskFields(task) {
    document.querySelector('#id').innerText = task.id;
    document.querySelector('#name').value = task.name;
    document.querySelector('#desc').value = task.desc;
    document.querySelector('#date').value = task.date;
}

// to clear the form fields 

function clearEditForm() {
    document.querySelector('#id').innerText = '';
    document.querySelector('#name').value = '';
    document.querySelector('#desc').value = '';
    document.querySelector('#date').value = '';
}

// to edit the tasks

function editTask(event) {
    const taskId = event.target.getAttribute('task-id');
    const task = taskManage.taskList.find(task => task.id == taskId);
    let row=this.parentNode.parentNode;
    row.classList.toggle('marked');
    fillTaskFields(task);
    return;
}

// to update the task
function updateTask(event) {
    let data = initTaskFields();
    if(!data || !data.id){
        return;
    }
    taskManage.update({...data, status: 'New'});
    clearEditForm();
    displayTasks(taskManage.taskList);

}
// to generate icon

function createIcon(clsname, fnIcon, id) {
    let icon = document.createElement('i');
    icon.className = `fa fa-${clsname} mlr`;
    icon.addEventListener('click', fnIcon);
    icon.setAttribute('task-id', id);
    return icon;
}


// To display the marked, unmarked, updated and important tasks

function taskCounts() {
    document.querySelector('#mark').innerText = taskManage.marked();
    document.querySelector('#unmark').innerText = taskManage.unmarked();
    document.querySelector('#important').innerText = taskManage.importMarked();
    document.querySelector('#total').innerText = taskManage.taskList.length;
}

// To display each Tasks

export function displayTask(task) {
    const tr = document.querySelector('#task-field').insertRow();
    let star=document.querySelector('.fa.fa-star.mlr');
    let trash=document.querySelector('.fa.fa-trash.mlr');
    tr.className = 'tr-data'
    let id = task.id;
    let cellIndex = 0;
    for (let i in task) {
        if (
        i=='marked' || 
        i=='important' || 
        typeof task[i] === 'function'
        ) {
            continue;
        }
        let value = task[i];
        let record = tr.insertCell(cellIndex);
        statusBar(value,task,record);
        record.key = i;
        cellIndex++;
    }
    let record = tr.insertCell(cellIndex);
    record.appendChild(createIcon('pencil', editTask, id));
    record.appendChild(createIcon('trash', markTask, id));
    record.appendChild(createIcon('star', importantTask, id));
    taskCounts();
}

// to display status bar

function statusBar(value,task,record){
    if(value==task.status && task.status=='New'){
        record.innerHTML =`${value} ${`<span id='' class='status-progress-bar new'></span>`}`;
    }
    else if(value==task.status && task.status=='Pending'){
        record.innerHTML =`${value} ${`<span id='' class='status-progress-bar pending'></span>`}`;

    }
    else if(value==task.status && task.status=='Complete'){
        record.innerHTML =`${value} ${`<span id='' class='status-progress-bar complete'></span>`}`;
    }
    else if (value==task.status && task.status=='Not Complete'){
        record.innerHTML =`${value} ${`<span id='' class='status-progress-bar complete'></span>`}`;
    }
    else {
        record.innerText = value;
    }
}

// To display all Tasks

function displayTasks(tasks) {
    let tbody = document.querySelector('#task-field');
    tbody.innerHTML = '';
    tasks.forEach((task) =>{
        displayTask(task)
    });
}


// To print tasks

function printTasks() {
    window.print();
}

// to display tasks without action column

export function displayTaskNew(task) {
    const tr = document.querySelector('#task-field').insertRow();
    tr.className = 'tr-data'
    let id = task.id;
    let cellIndex = 0;
    for (let i in task) {
        if (i=='marked' || i=='important' || typeof task[i] === 'function') {
                continue;
            }
        let value = task[i];
        let record = tr.insertCell(cellIndex);
        statusBar(value,task,record);
        record.key = i;
        cellIndex++;
    }
}


// to display date and time

(function () {
    let year = new Date();
    document.querySelector('#copyright').innerHTML = `© Copyright ${year.getFullYear()}. All Rights Reserved`;
    document.querySelector('#developer-info').innerText = 'Designed and Developed by Anish Verma';
    document.querySelector('#contact-link').innerText = 'Github Link';
}
)();
