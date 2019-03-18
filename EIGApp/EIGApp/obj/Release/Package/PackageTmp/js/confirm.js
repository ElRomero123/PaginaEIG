window.onload = initUser;

var f = 'https://www.facebook.com/Elite-Intelligence-Group-260263604734008/';
var t = 'https://twitter.com/EliteIntellige1?lang=es';
var y = 'https://www.youtube.com/channel/UCOvdAjzfv4WlwxKc1fi5JYQ';
var g = 'https://plus.google.com/u/0/109910140252090488175';

function initUser()
{
    var name     = localStorage.getItem('Name');
    var username = localStorage.getItem('Username');
    var linea    = localStorage.getItem('Linea');
    
    if(name != null)
    {
        $('#infoName').text(name);
        $('#infoUsername').text(username);

        if(linea != null)
        {
            $('#campoLinea').val(linea);
            $('#campoProducto').val(localStorage.getItem('Producto'));
            $('#campoCantidad').val(localStorage.getItem('Cantidad'));
            $('#campoCubrimiento').val(localStorage.getItem('Cubrimiento'));
            $('#campoPrecio').val(localStorage.getItem('Precio'));
        }

        else
        {
            location.href = 'error.html';
        }
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
        default:
        var Call = localStorage.getItem('Call');

        if(Call == 1)
        {
            location.href = 'menu3.html';
            localStorage.removeItem('Call');
        }

        else if (Call == 2)
        {
            location.href = 'productos.html';
            localStorage.removeItem('Call');
        }

        else
        {
            location.href = 'menu7.html';
            localStorage.removeItem('Call');
        }
    }
}

function addPackage()
{
    $('#addPackage').css('background','yellow');
    $('#addPackage').css('border','2px solid yellow');
    $('#addPackage').css('color','black');
    $('#addPackage').text('Confirmando compra...');

    var paquete =
    {
        linea: $('#campoLinea').val(),
        producto: $('#campoProducto').val(),
        cantidad: $('#campoCantidad').val(),
        fechaCompra: '',
        tiempoCubrimiento: $('#campoCubrimiento').val(),
        precio: $('#campoPrecio').val(),
        kind: localStorage.getItem('Call'),
        idUser: localStorage.getItem('User')
    };

    $.ajax
    (
        {
            url: '../api/package',
            type: 'POST',
            data: JSON.stringify(paquete),
            contentType: "application/json;charset=utf-8",

            success:
            function (data)
            {
                if (data)
                {
                    localStorage.removeItem('Linea');
                    localStorage.removeItem('Producto');
                    localStorage.removeItem('Cantidad');
                    localStorage.removeItem('Cubrimiento');
                    localStorage.removeItem('Precio');

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

function social(op)
{
    switch(op)
    {
        case 1:
        window.open(f, '_blank');
        break;
        case 2:
        window.open(t, '_blank');
        break;
        case 3:
        window.open(y, '_blank');
        break;
        default:
        window.open(g, '_blank');
    }
}