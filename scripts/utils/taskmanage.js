/**
 * author - Anish Verma
 * version 1.0
 */

import {Task} from '../model/task.js';
import { firebaseManage } from './firebaseManage.js';

export const taskManage={
    taskList:[],
    add:function(id,name,desc,date,status,marked,important) {
        const task=new Task(id,name,desc,date,status,marked,important);
        this.taskList.push(task);
        return task;
    },
    delete:function() {
        this.taskList=this.taskList.filter((task)=>!task.isMarked);
        return this.taskList;
    },
    deleteAll:function(){
        this.taskList=this.taskList.filter((task)=>task=='');
        return this.taskList;
    },
    save:function(){
        let alltask=this.taskList;
        localStorage.alltask=JSON.stringify(alltask);
    },    
    saveToDB:function(){
        this.taskList.forEach(async (task)=>{
            const resDoc=await firebaseManage.add({
                id:task.id,
                name:task.name,
                desc:task.desc, 
                date:task.date,
                status:task.status,
                marked:task.marked,
                important:task.important
            });
            console.log('The docs is ',resDoc);
        });
    },
    loadFromDB:async function(){
        const docs=await firebaseManage.read();
        docs.forEach((doc)=>{
            const obj=doc.data();
            const task=new Task();
            for(let x in obj){
                task[x]=obj[x];
            }
            this.taskList.push(task);
        });
        return this.taskList;
    },
    search:function(textVal){
        let searchResult=this.taskList.filter(ele=>(ele.name===textVal||ele.id===textVal||ele.desc===textVal));
        return searchResult;
    },
    update:function(data){
        let index=this.taskList.findIndex((task)=>task.id==data.id);
        if(index>-1) {
            this.taskList[index] = data;
        }
    },
    mark:function(id) {
        let task=this.taskList.find((task)=>task.id==id);
        if(task) {
            task.toggle();
        }
    },
    marked:function() {
       let markCount= this.taskList.filter((task)=>task.marked).length;
       return markCount;
    },
    unmarked:function(markCount) {
        return this.taskList.length-this.marked();
    },
    important:function(id){
        let task=this.taskList.find((task)=>task.id==id);
        if(task) {
            task.toggleImp();
        }
    },
    importMarked:function(){
        let imp=this.taskList.filter((task)=>task.important).length;
        return imp;
    }
};

export const taskIdGen=(function idGen(){
    let taskId=100;
    return ()=> ++taskId;
    function taskIdGen(){
        let gen=++taskId;
        return gen;
    }
    return taskIdGen;
})();

