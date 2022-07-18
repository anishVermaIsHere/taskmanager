export default function aside() {
    document.querySelector('.hambg').addEventListener('click', openMenu);
    document.querySelector('.closehambg').addEventListener('click', closeMenu);
    function openMenu() {
        let menu = document.querySelector('.aside');
        menu.style.display = 'block';
        // let showMenu=menu.style.display='block';
        // if(showMenu=!menu.style.display='block')
    }
    function closeMenu() {
        let menu = document.querySelector('.aside');
        menu.style.display = 'none';
    }
    return {
        openMenu,
        closeMenu
    };
}
