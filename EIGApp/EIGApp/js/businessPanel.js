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
        default: location.href = 'menu3.html';
    }
}

function confirm(num, producto, cantidad, cubrimiento, precio)
{
    switch(num)
    {
        case 1:
        location.href = 'confirm.html';
        localStorage.setItem('Linea', 'Empresas de seguridad');
        localStorage.setItem('Producto', producto);
        localStorage.setItem('Cantidad', cantidad);
        localStorage.setItem('FechaCompra', 'HOY');
        localStorage.setItem('Cubrimiento', cubrimiento);
        localStorage.setItem('Precio', precio);
        localStorage.setItem('Llamado', '1');
        break;
        
        default:
        location.href = 'confirm.html';
        localStorage.setItem('Linea', 'Cursos, productos y eventos');
        localStorage.setItem('Producto', producto);
        localStorage.setItem('Cantidad', cantidad);
        localStorage.setItem('FechaCompra', 'HOY');
        localStorage.setItem('Cubrimiento', cubrimiento);
        localStorage.setItem('Precio', precio);
        localStorage.setItem('Llamado', '2');
    }
}