import {db} from './firebase.js';

export const firebaseManage={
    async read(){
        const docs =await db.collection('tasks').get();
        return docs;
    },
    readRealTime(){
        return db.collection('tasks');
    },
    async add(task){
        const obj={};
        for(let x in task){
            obj[x]=task[x];
        }
        const doc=await db.collection('tasks').add(obj);
        return doc;
    }
};      
