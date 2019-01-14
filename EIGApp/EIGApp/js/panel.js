window.onload = initUser;

function initUser()
{
    var name     = localStorage.getItem('Name');
    var username = localStorage.getItem('Username');
    
    if(name != null)
    {
        $('#infoName').text(name);
        $('#infoUsername').text(username);
    }

    else
    {
        location.href = 'index.html';
    }
}

function cerrarSesion()
{
    localStorage.clear();
    location.href = 'index.html';
}

function to(num)
{
    switch(num)
    {
        case 1: location.href = 'menu.html';
        break;
        case 2: location.href = 'menu2.html';
        break;
        case 3: location.href = 'menu3.html';
        break;
        default: location.href = 'menu4.html';
    }
}

function create(num)
{
    switch(num)
    {
        case 1: alert('Crear persona funciona');
        break;
        default: alert('Crear otro tipo funciona');
    }
}