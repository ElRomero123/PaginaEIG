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

        var idUser = localStorage.getItem('User');

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
                            cadena += "<div id='" + data[i].Id + "' class='result' onclick='toCreate(this)'> <div class='text'> <p class='pf1'>" + data[i].Linea + "</p> <p class='pf2'>" + data[i].Producto + "</p> <p class='pf3'>" + data[i].Cantidad + "</p> <p class='pf4'>" + data[i].FechaCompra + "</p> <p class='pf4'>" + data[i].TiempoCubrimiento + "</p> <p class='pf4'>" + data[i].Precio + "</p> <p hidden id='k" + data[i].Id + "' class='pf4'>" + data[i].Kind + "</p> </div> </div>";  
                        }
                        
                        $('#listResults').append(cadena);

                        $('#bannerState').css('background','green');
                        $('#bannerState').css('color','white');
                        $('#bannerState').text('Tienes ' + i + ' paquete(s)!');
                        $('#listResults').css('display','flex');
                    }

                    else
                    {
                        $('#bannerState').css('background','red');
                        $('#bannerState').css('color','white');
                        $('#bannerState').text('Aún NO tienes paquetes!');
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
        var Call = localStorage.getItem('Call');
        if(Call == 1)
        {
            location.href = 'menu3.html';
            localStorage.removeItem('Call');
        }

        else if(Call == 2)
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

function toCreate(e)
{
    var kindP = document.getElementById("k" + e.id);
    var opcNum = kindP.innerHTML;
    localStorage.setItem('IdPackage', e.id);

    if(opcNum == 1)
    {
        location.href = 'addBusiness.html';
    }
    else if(opcNum == 2)
    {
        location.href = 'addBusinessC.html';
    }
    else
    { 
        location.href = 'addProduct.html';
    }
}