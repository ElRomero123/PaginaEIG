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

    loadPackages();
}

function loadPackages()
{
    if(navigator.onLine)
    {
        $('#listResults').empty();
        $('#listResults').hide();
        $('#bannerState').css('display','block');
        $('#bannerState').css('background','yellow');
        $('#bannerState').css('color','black');
        $('#bannerState').text('Cargando ...');

        var idUser = document.getElementById('User');

        $.ajax
        (
            {
                url: '../api/package/?idUser=' + idUser,
                type: 'GET',
                contentType: "application/json;charset=utf-8",

                success:
                function (data) 
                {
                    if(data.length > 0)
                    {
                        var cadena = "";

                        for(var i = 0; i < data.length; i++)
                        {
                            cadena += "<div id=" + i + "class='result'> <div id='text'> <p id='pf1'>" + data[i].Linea + "</p> <p id='pf2'>" + data[i].Producto + "</p> <p id='pf3'>" + data[i].Cantidad + "</p> <p id='pf4'>" + data[i].FechaCompra + "</p> <p id='pf4'>" + data[i].TiempoCubrimiento + "</p> <p id='pf4'>" + data[i].Precio + "</p> </div> </div>";  
                        }
                        
                        $('#listResults').append(cadena);

                        $('#bannerState').css('background','green');
                        $('#bannerState').css('color','white');
                        $('#bannerState').text(i + ' investigador(es) encontrados!');
                        $('#listResults').css('display','flex');
                    }

                    else
                    {
                        $('#bannerState').css('background','red');
                        $('#bannerState').css('color','white');
                        $('#bannerState').text('Sin resultados!');
                    }
                }
            }
        );
    }

    else
    {
        $('#bannerState').css('background','red');
        $('#bannerState').css('color','white');
        $('#bannerState').text('No estás conectado a internet!');
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
        var llamado = localStorage.getItem('Llamado');
        switch(llamado)
        {
            case 1:
            location.href = 'menu3.html';
            break;
            case 2:
            location.href = 'menu4.html';
            default:
            $('#bannerState').css('background','red');
            $('#bannerState').css('color','white');
            $('#bannerState').text('Tu paquete ya ha sido adquirido!');
        }
    }
}