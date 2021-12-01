// Para esto debe de haber una variale de local storage definida llamada logged


document.addEventListener('DOMContentLoaded', (event) => {
    var logged = localStorage.getItem('logged');
    if(logged == 'true'){
        document.getElementById('navOpciones').style.display = 'none';
        document.getElementById('navLogout').style.display = 'none';
    }
})