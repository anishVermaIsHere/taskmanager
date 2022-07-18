import { taskManage } from '../utils/taskmanage.js';
import aside  from '../utils/sidemenu.js';
import {displayTaskNew} from './controller.js';

window.addEventListener('load', bindDashBoardEvents);

function bindDashBoardEvents(){
    printTable();
    aside();
}

async function printTable(){
    const tasks = await taskManage.loadFromDB();
    displayTasks(tasks);
}


export function displayTasks(tasks) {
    let tbody = document.querySelector('#task-field');
    tbody.innerHTML = '';
    tasks.forEach((task) => {
        if(task.important===true){
        displayTaskNew(task);
        }
    });
}

