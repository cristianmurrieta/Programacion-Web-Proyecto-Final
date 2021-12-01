// Para esto debe de haber una variale de local storage definida llamada logged


document.addEventListener('DOMContentLoaded', (event) => {
    var logged = localStorage.getItem('logged');
    console.log(logged);
    if(logged == 'true'){
        document.getElementById('nav-opciones').style.display = 'none';
        document.getElementById('nav-logout').style.display = 'none';
    }
})