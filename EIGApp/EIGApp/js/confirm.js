window.onload = initUser;

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
            location.href = 'businessPanel.html';
            localStorage.removeItem('Call');
        }

        else
        {
            location.href = 'businessPanelC.html';
            localStorage.removeItem('Call');
        }
        /*
        switch(llamado)
        {
            case 1:
            location.href = 'businessPanel.html';
            break;
            case 2:
            location.href = 'productPanel.html';
            break;
            case 3:
            location.href = 'businessPanelC.html';
            break;
            default:
            location.href = 'productPanelC.html';
        }
        */
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
        kind: localStorage.getItem('Llamado'),
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
                    localStorage.removeItem('Llamado');

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