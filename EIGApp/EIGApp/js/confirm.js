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

function toMenu()
{
    location.href = 'menu.html';
}

function addPackage()
{
    $('#addPackage').css('background','yellow');
    $('#addPackage').css('border','2px solid yellow');
    $('#addPackage').css('color','black');
    $('#addPackage').text('Confirmando compra...');

    var paquete =
    {
        linea: $('#campoUsername').val(),
        producto: $('#campoPassword').val(),
        cantidad: $('#campoName').val(),
        FechaCompra: $('#campoEmail').val(),
        tiempoCubrimiento: $('#campoAddress').val(),
        precio: false,
        idUser: localStorage.getItem('User')
    };

    $.ajax
    (
        {
            url: '../api/user',
            type: 'POST',
            data: JSON.stringify(paquete),
            contentType: "application/json;charset=utf-8",

            success:
            function (data)
            {
                if (data)
                {
                    location.href = 'managePackage.html';
                }

                else
                {
                    $('#addPackage').css('background','red');
                    $('#addPackage').css('border','2px solid red');
                    $('#addPackage').css('color','white');
                    $('#addPackage').text('Problema en la confirmación!');
                }
            }
        }
    );
}