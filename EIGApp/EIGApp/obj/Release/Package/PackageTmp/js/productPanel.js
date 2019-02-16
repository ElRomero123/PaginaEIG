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
        default: location.href = 'productos.html';
    }
}

function confirm(cantidad, producto, cubrimiento, precio)
{
    location.href = 'confirm.html';
    localStorage.setItem('Linea', 'Curso/Promoción/Evento');
    localStorage.setItem('Cantidad', cantidad);
    localStorage.setItem('Producto', producto);
    localStorage.setItem('Cubrimiento', cubrimiento);
    localStorage.setItem('Precio', precio);
    localStorage.setItem('Call', 3);
}