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

function to(num)
{
    switch(num)
    {
        case 1: 
        localStorage.clear();
        location.href = 'index.html';
        break;
        default: location.href = 'menu7.html';
    }
}

function confirm(cantidad, cubrimiento, precio)
{
    location.href = 'confirm.html';
    localStorage.setItem('Linea', 'Empresas de seguridad');
    localStorage.setItem('Producto', 'Paquete de Afiliación');
    localStorage.setItem('Cantidad', cantidad);
    localStorage.setItem('Cubrimiento', cubrimiento);
    localStorage.setItem('Precio', precio);
    localStorage.setItem('Llamado', 3);
}