window.onload = initUser;

function initUser()
{
    var name     = localStorage.getItem('Name');
    var username = localStorage.getItem('Username');
    
    if(name != null)
    {
        $('#infoName').text(name);
        $('#infoUsername').text(username);

        $('#campoLinea').text(localStorage.getItem('Linea'));
        $('#campoProducto').text(localStorage.getItem('Producto'));
        $('#campoCantidad').text(localStorage.getItem('Cantidad'));
        $('#campoFechaCompra').text(localStorage.getItem('FechaCompra'));
        $('#campoCubrimiento').text(localStorage.getItem('Cubrimiento'));
        $('#campoPrecio').text(localStorage.getItem('Precio'));
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