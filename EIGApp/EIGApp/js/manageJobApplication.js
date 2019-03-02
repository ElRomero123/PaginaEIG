window.onload = initUser;

var f = 'https://www.facebook.com/Elite-Intelligence-Group-260263604734008/';
var t = 'https://twitter.com/EliteIntellige1?lang=es';
var y = 'https://www.youtube.com/channel/UCOvdAjzfv4WlwxKc1fi5JYQ';
var g = 'https://plus.google.com/u/0/109910140252090488175';

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

    loadJobApplications();
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
        location.href = 'menu6.html';
    }
}

function loadJobApplications()
{
    if(navigator.onLine)
    {
        $('#listResults').empty();
        $('#listResults').hide();
        $('#bannerState').css('display','block');
        $('#bannerState').css('background','yellow');
        $('#bannerState').css('color','black');
        $('#bannerState').text('Cargando tus solicitudes ...');

        var idUser = localStorage.getItem('User');

        $.ajax
        (
            {
                url: '../api/jobApplication/?idUser=' + idUser,
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
                            cadena += "<div class='result'> <div class='text'> <p class='pf1'>" + data[i].Name + "</p> <p class='pf2'>Identificación " + data[i].DocumentNumber + "</p> <p class='pf2'>" + data[i].DescriptionApplication + "</p> <p class='pf2'>" + data[i].Age + " años</p> <p class='pf3'> Publicado el " + data[i].PostedDate + "</p> <button id='" + data[i].Id + "' class='deleteResult' onclick='eliminar(this)'>Eliminar</button> <button id='" + data[i].Id + "' class='moreResult' onclick='toEditJA(this)'>Ver anexos</button> </div> </div>";  
                        }
                        
                        $('#listResults').append(cadena);
                        $('#bannerState').css('background','green');
                        $('#bannerState').css('color','white');
                        $('#bannerState').text('Usted tiene ' + i + ' solicitudes de empleo!');
                        $('#listResults').css('display','flex');
                    }

                    else
                    {
                        $('#bannerState').css('background','red');
                        $('#bannerState').css('color','white');
                        $('#bannerState').text('Aún no has realizado una solicitud!');
                    }
                }
            }
        );
    }

    else
    {
        $('#bannerState').css('background','red');
        $('#bannerState').css('color','white');
        $('#bannerState').text('Sin internet!');
    }
}

function toEditJA(e)
{
    localStorage.setItem('JA', e.id);
    location.href = 'editJA.html';
}

function eliminar(e)
{
    $.ajax
    (
        {
            url: '../api/jobApplication/?idJA=' + e.id,
            type: 'POST',
            contentType: "application/json;charset=utf-8",

            success:
            function (data) 
            {
                if(data)
                {
                    $('#bannerState').css('background','brown');
                    $('#bannerState').text('La solicitud ha sido eliminada!');
                    setTimeout(recargar, 800);
                }
            }
        }
    );
}

function recargar()
{
    location.reload();
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