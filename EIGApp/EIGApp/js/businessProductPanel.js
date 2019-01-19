window.onload = initUser;

function initUser()
{
    var name     = localStorage.getItem('Name');
    var username = localStorage.getItem('Username');
    
    if(name != null)
    {
        $('#infoName').text(name);
        $('#infoUsername').text(username);

        $('#campoLinea').val(localStorage.getItem('Linea'));
        $('#campoProducto').val(localStorage.getItem('Producto'));
        $('#campoCantidad').val(localStorage.getItem('Cantidad'));
        $('#campoFechaCompra').val(localStorage.getItem('FechaCompra'));
        $('#campoCubrimiento').val(localStorage.getItem('Cubrimiento'));
        $('#campoPrecio').val(localStorage.getItem('Precio'));
    }

    else
    {
        location.href = 'index.html';
    }
}

function back()
{
    var llamado = localStorage.getItem('Llamado');
    if(llamado == 1)
    {
        location.href = 'businessPanel.html';
    }
    else
    {
        location.href = 'productPanel.html';
    }
}

function cerrarSesion()
{
    localStorage.clear();
    location.href = 'index.html';
}