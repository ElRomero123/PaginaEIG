window.onload = initUser;
var f = 'https://www.facebook.com/Elite-Intelligence-Group-260263604734008/';
var t = 'https://twitter.com/EliteIntellige1?lang=es';
var y = 'https://www.youtube.com/channel/UCOvdAjzfv4WlwxKc1fi5JYQ';
var g = 'https://plus.google.com/u/0/109910140252090488175';

function initUser()
{
    var name     = localStorage.getItem('Name');
    var email = localStorage.getItem('Email');
    
    if(name != null)
    {
        $('#infoName').text(name);
        $('#infoUsername').text(email);
    }

    else
    {
        location.href = 'index.html';
    }

    loadProfilesUser();
}

function loadProfilesUser()
{
    if(navigator.onLine)
    {
        $('#listResults').empty();
        $('#listResults').hide();
        $('#bannerState').css('display','block');
        $('#bannerState').css('background','yellow');
        $('#bannerState').css('color','black');
        $('#bannerState').text('Cargando ...');

        var idUser = localStorage.getItem('IdUser');

        $.ajax
        (
            {
                url: '../api/person/?idUser=' + idUser,
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
                            if(data[i].Active)
                            {
                                cadena += "<div class='result'> <div class='avatar' id='" + i + "'></div> <div class='text'> <p class='pf1'>" + data[i].Name + "</p> <p class='pf2'>" + data[i].ProfesionDescription + "</p> <p class='pf3'>" + data[i].Email + "</p> <p class='pf4'>" + data[i].Phone + "</p> <p class='pf4'> <p class='pf4'> Ciprin: " + data[i].Ciprin + "</p> <p class='pf4'>" + 'Unido el ' + data[i].CreationDate + ' ' + data[i].CreationHourZone +  "</p> <button class='moreResult' id='" + data[i].Id + "' onclick='change(this, 1)'>Desactivar</button> </div> </div>";
                            }

                            else
                            {
                                cadena += "<div class='result'> <div class='avatar' id='" + i + "'></div> <div class='text'> <p class='pf1'>" + data[i].Name + "</p> <p class='pf2'>" + data[i].ProfesionDescription + "</p> <p class='pf3'>" + data[i].Email + "</p> <p class='pf4'>" + data[i].Phone + "</p> <p class='pf4'> <p class='pf4'> Ciprin: " + data[i].Ciprin + "</p> <p class='pf4'>" +  'Unido el ' + data[i].CreationDate + ' ' + data[i].CreationHourZone +  "</p> <button class='moreResult' id='" + data[i].Id + "' onclick='change(this, 2)'>Activar</button> </div> </div>";
                            }
                        }

                        $('#listResults').append(cadena);

                        for(var i = 0; i < data.length; i++)
                        {
                            if(data[i].Active == 1)
                            {
                                $('#' + data[i].Id).css('background','green');
                                $('#' + data[i].Id).css('color','white');
                            }

                            else
                            {
                                $('#' + data[i].Id).css('background','red');
                                $('#' + data[i].Id).css('color','white');
                            }

                            avatar = data[i].Avatar;
                            document.getElementById(i).style.background = 'url("' + avatar + '")';
                        }
                        
                        $('#bannerState').css('background','green');
                        $('#bannerState').css('color','white');
                        $('#bannerState').text('El usuario tiene ' + i + ' perfiles!');
                        $('#listResults').css('display','flex');
                    }

                    else
                    {
                        $('#bannerState').css('background','red');
                        $('#bannerState').css('color','white');
                        $('#bannerState').text('El usuario NO tiene perfiles!');
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

function showMedia(e)
{
    alert('Ver multimedia de ' + e.id + ' funciona');
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
        location.href = 'userControllerAdministrator.html';
    }
}

function change(opt, e)
{
    $('#' + e.id).css('background','yellow');
    $('#' + e.id).css('color','black');
    $('#' + e.id).text('Cambiando ...');

    switch(opt)
    {
        case 1:
        $.ajax
        (
            {
                url: '../api/person?idPerson=' + e.id,
                type: 'POST',
                contentType: "application/json;charset=utf-8",
    
                success:
                function (data) 
                {
                    if(data)
                    {
                        $('#' + e.id).css('background','green');
                        $('#' + e.id).css('color','white');
                        $('#' + e.id).text('Desactivar');
                    }
    
                    else
                    {
                        $('#' + e.id).css('background','red');
                        $('#' + e.id).css('color','white');
                        $('#' + e.id).text('Activar');
                    }
                }
            }
        );
        break;
        default:
        $.ajax
        (
            {
                url: '../api/otherPerson?idOtherPerson=' + e.id,
                type: 'POST',
                contentType: "application/json;charset=utf-8",

                success:
                function (data) 
                {
                    if(data)
                    {
                        $('#' + e.id).css('background','green');
                        $('#' + e.id).css('color','white');
                        $('#' + e.id).text('Desactivar');
                    }

                    else
                    {
                        $('#' + e.id).css('background','red');
                        $('#' + e.id).css('color','white');
                        $('#' + e.id).text('Activar');
                    }
                }
            }
        );
    }    
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