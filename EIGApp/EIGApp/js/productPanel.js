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

function confirm(cantidad, cubrimiento, precio)
{
    location.href = 'confirm.html';
    localStorage.setItem('Linea', 'Curso/Promoción/Evento');
    localStorage.setItem('Producto', 'Afiliación');
    localStorage.setItem('Cantidad', cantidad);
    localStorage.setItem('FechaCompra', 'HOY');
    localStorage.setItem('Cubrimiento', cubrimiento);
    localStorage.setItem('Precio', precio);
    localStorage.setItem('Llamado', '2');
}