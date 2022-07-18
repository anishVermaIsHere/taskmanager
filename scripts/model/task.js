/**
 * author - Anish Verma
 * version 1.0
 */

export function Task(id,name,desc,date,status,marked,important) {
    this.id=id;
    this.name=name;
    this.desc=desc;
    this.date=date;
    this.marked=marked;
    this.important=important;
    this.status=status;
}
Task.prototype.toggle=function() {
    this.marked=!this.marked;
};
Task.prototype.toggleImp=function(){
    this.important=!this.important;
};
