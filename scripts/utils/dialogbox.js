
export function showAlert() {
    function welcomeAlert(){
        let name=document.querySelector('#username').innerText;
        let message=`Hello ${name}`;
        let dialogsection=document.querySelector('#dialog-section');
        let alert=document.createElement('div');
        alert.className='welcome';
        dialogsection.appendChild(alert);
        
        let heading=document.createElement('h2');
        let alertmsg1=document.createElement('p');
        let alertmsg2=document.createElement('p');
        alert.appendChild(alertmsg1);
        alert.appendChild(alertmsg2);
        alertmsg1.innerText=message;
        alertmsg2.innerText='Welcome to the Task Manager';
    
        let button=document.createElement('button');
        button.id='welcome-ok';
        alert.appendChild(button);
        button.innerText='OK';
        dialogsection.style.display='block';
        initAlertClose().closeWelcome();

    }
    function alertOpen(message) {
        let dialogsection=document.querySelector('#dialog-section');
        let alert=document.createElement('div');
        alert.className='alert';
        dialogsection.appendChild(alert);
        
        let heading=document.createElement('h2');
        heading.id='alert';
        alert.appendChild(heading);
        heading.innerText='Alert';
    
        let span=document.createElement('span');
        alert.appendChild(span);
    
        let icon=document.createElement('i');
        icon.className='far fa-window-close';
        span.appendChild(icon);
    
        let alertmsg=document.createElement('p');
        alert.appendChild(alertmsg);
        alertmsg.innerText=message;
    
        let button=document.createElement('button');
        button.id='alert-ok';
        alert.appendChild(button);
        button.innerText='OK';
        dialogsection.style.display='block';

        initAlertClose().closeDialog1();
    }
    function alertClose() {
        let div=document.querySelector('#dialog-section');
        let alert=document.querySelector('.alert');
        alert.remove();
        div.style.display='none';
    }
    function alertDialog(divclass,message,iconclass,icon,bgColor){
        let dialog=document.querySelector('#dialog');
        let alert=document.createElement('div');
        alert.className=`${divclass}`;
        dialog.appendChild(alert);
        
        let span1=document.createElement('span');
        let span2=document.createElement('span');
        alert.appendChild(span1);
        alert.style.backgroundImage=bgColor;
        span1.innerText=`${message}`;
        alert.appendChild(span2);
        span2.className=`${iconclass}`;
        span2.innerHTML=`${icon}`;
        initAlertClose().closeDialog2();
        setTimeout(()=> closeDialog(), 6000);
    }
    function closeDialog() {
        let alert=document.querySelector('.alert-show');
        if(alert) {
            alert.remove();
        }
    }
    
    function initAlertClose(){
       
        function closeDialog1(){
            document.querySelector('.fa-window-close').addEventListener('click',alertClose);
            document.querySelector('#alert-ok').addEventListener('click',alertClose);
        }
        function closeDialog2(){
            document.querySelector('.material-icons').addEventListener('click',closeDialog);
        }
        function closeWelcome(){
            document.querySelector('#welcome-ok').addEventListener('click',()=>{
                document.querySelector('.welcome').remove();
                document.querySelector('#dialog-section').style.display='none';
            });
        }
        return {
            closeDialog1,
            closeDialog2,
            closeWelcome
        }
    }

    return {
        welcomeAlert,
        alertOpen,
        alertClose,
        alertDialog,
        closeDialog,
        initAlertClose
    };

}

