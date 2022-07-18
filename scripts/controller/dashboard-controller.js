import {displayTaskNew} from './controller.js';
import { taskManage } from '../utils/taskmanage.js';
import aside  from '../utils/sidemenu.js';
import {initDashboard} from '../utils/config-chart.js';

window.addEventListener('load', bindDashBoardEvents);

function bindDashBoardEvents(){
    printTable();
    aside();
}

export async function loadTasks() {
    const tasks = await taskManage.loadFromDB();
    const allTasks=tasks.map((t)=>t.name);
    return allTasks;
}


async function printTable(){
    const tasks = await taskManage.loadFromDB();
    displayTasks(tasks);
    initDashboard(tasks);
}

 function displayTasks(tasks) {
    let tbody = document.querySelector('#task-field');
    tbody.innerHTML = '';
    tasks.forEach((task) => {
        displayTaskNew(task);
    });
}
