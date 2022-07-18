
import {gLogin} from './login.js';

addEventListener('load', init);

function init(){
    loginEvents();
}

function loginEvents(){
    document.querySelector('#google-signin').addEventListener('click', gLogin);
}
