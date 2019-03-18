window.onload = initUser;
var f,t,y,g;
f = 'https://www.facebook.com/Elite-Intelligence-Group-260263604734008/';
t = 'https://twitter.com/EliteIntellige1?lang=es';
y = 'https://www.youtube.com/channel/UCOvdAjzfv4WlwxKc1fi5JYQ';
g = 'https://plus.google.com/u/0/109910140252090488175';

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
            url: '../api/jobApplication/?idUser=' + idUser,
            type: 'GET',
            contentType: "application/json;charset=utf-8",

            success:
            function (data) 
            {
                if(data.length > 0)
                {
                    var chain = new StringBuilder();
                    for(var i = 0; i < data.length; i++)
                    {
                        chain.append("<div class='result'> <div class='text'> <p class='pf1'>" + data[i].Name + "</p> <p class='pf2'>Identificación " + data[i].DocumentNumber + "</p> <p class='pf2'>" + data[i].DescriptionApplication + "</p> <p class='pf2'>" + data[i].Age + " años</p> <p class='pf2'>Publicado el " + data[i].PostedDate + "</p> <p class='pf4'>" + data[i].PostedHourZone + "</p> <button id='" + data[i].Id + "' class='deleteResult' onclick='elim(this)'>Eliminar</button> <button id='" + data[i].Id + "' class='moreResult' onclick='toEditJA(this)'>Ver anexos</button> </div> </div>");  
                    }
                    $('#bannerState').css('background','green');
                    $('#bannerState').css('color','white');
                    $('#bannerState').text(i + ' Solicitudes!');
                    $('#listResults').css('display','flex');
                    $('#listResults').append(chain.toString());
                    chain.clear();
                }

                else
                {
                    $('#bannerState').css('background','red');
                    $('#bannerState').css('color','white');
                    $('#bannerState').text('Sin solicitudes!');
                }
            }
        }
    );
}

function toEditJA(e)
{
    localStorage.setItem('JA', e.id);
    location.href = 'editJA.html';
}

function elim(e)
{
    $.ajax
    (
        {
            url: '../api/mediaJA/?idJA=' + e.id,
            type: 'GET',
            contentType: "application/json;charset=utf-8",

            success:
            function (data) 
            {
                if(data.length > 0)
                {
                    $('#bannerState').css('background','red');
                    $('#bannerState').css('color','white');
                    $('#bannerState').text('Elimine Archivos primero!');
                }
                else
                {
                    deleteMedia(e.id);
                }
            }
        }
    );
}

function deleteMedia(id)
{
    $('#bannerState').css('display','block');
    $('#bannerState').css('background','yellow');
    $('#bannerState').css('color','black');
    $('#bannerState').text('Eliminando ...');
    $.ajax
    (
        {
            url: '../api/jobApplication/?idJA=' + id,
            type: 'POST',
            contentType: "application/json;charset=utf-8",

            success:
            function (data) 
            {
                if(data)
                {
                    $('#bannerState').css('background','brown');
                    $('#bannerState').text('Eliminado con éxito!');
                    setTimeout(recargar, 800);
                }

                else
                {
                    $('#bannerState').css('background','red');
                    $('#bannerState').css('color','white');
                    $('#bannerState').text('NO se pudo eliminar!');
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

class StringBuilder 
{
    constructor(value) 
    {
        this.strings = new Array();
        this.append(value);
    }
    append(value) 
    {
        if (value) 
        {
            this.strings.push(value);
        }
    }
    clear() 
    {
        this.strings.length = 0;
    }
    toString() 
    {
        return this.strings.join("");
    }
}