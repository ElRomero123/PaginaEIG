window.onload = initUser;
var f = 'https://www.facebook.com/Elite-Intelligence-Group-260263604734008/';
var t = 'https://twitter.com/EliteIntellige1?lang=es';
var y = 'https://www.youtube.com/channel/UCOvdAjzfv4WlwxKc1fi5JYQ';
var g = 'https://plus.google.com/u/0/109910140252090488175';

function initUser()
{
    var name  = localStorage.getItem('Name');
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
                        var chain = new StringBuilder();
                        for(var i = 0; i < data.length; i++)
                        {
                            if(data[i].Active)
                            {
                                if(data[i].Type)
                                {
                                    chain.append("<div class='result'> <div class='avatar' id='" + i + "'></div> <div class='text'> <p class='pf1'>" + data[i].Name + "</p> <p class='pf2'>" + data[i].ProfesionDescription + "</p> <p class='pf2'>" + data[i].Email + "</p> <p class='pf2'>" + data[i].Phone + "</p> <p class='pf2'> <p class='pf2'>Ciprin: " + data[i].Ciprin + "</p> <p class='pf2'>" + 'Unido el ' + data[i].CreationDate + "</p> <p class='pf4'>" + data[i].CreationHourZone + "</p> <button style='background:green; color:white' class='moreResult' id='" + data[i].Id + "' onclick='changeOP(this)'>Desactivar</button> </div> </div>");
                                }

                                else
                                {
                                    chain.append("<div class='result'> <div class='avatar' id='" + i + "'></div> <div class='text'> <p class='pf1'>" + data[i].Name + "</p> <p class='pf2'>" + data[i].ProfesionDescription + "</p> <p class='pf2'>" + data[i].Email + "</p> <p class='pf2'>" + data[i].Phone + "</p> <p class='pf2'> <p class='pf2'>Ciprin: " + data[i].Ciprin + "</p> <p class='pf2'>" + 'Unido el ' + data[i].CreationDate + "</p> <p class='pf4'>" + data[i].CreationHourZone + "</p> <button style='background:green; color:white' class='moreResult' id='" + data[i].Id + "' onclick='changeP(this)'>Desactivar</button> </div> </div>");
                                }
                            }

                            else
                            {
                                if(data[i].Type)
                                {
                                    chain.append("<div class='result'> <div class='avatar' id='" + i + "'></div> <div class='text'> <p class='pf1'>" + data[i].Name + "</p> <p class='pf2'>" + data[i].ProfesionDescription + "</p> <p class='pf2'>" + data[i].Email + "</p> <p class='pf2'>" + data[i].Phone + "</p> <p class='pf2'> <p class='pf2'>Ciprin: " + data[i].Ciprin + "</p> <p class='pf2'>" +  'Unido el ' + data[i].CreationDate + "</p> <p class='pf4'>" + data[i].CreationHourZone + "</p> <button style='background:red; color:white' class='moreResult' id='" + data[i].Id + "' onclick='changeOP(this)'>Activar</button> </div> </div>");
                                }

                                else
                                {
                                    chain.append("<div class='result'> <div class='avatar' id='" + i + "'></div> <div class='text'> <p class='pf1'>" + data[i].Name + "</p> <p class='pf2'>" + data[i].ProfesionDescription + "</p> <p class='pf2'>" + data[i].Email + "</p> <p class='pf2'>" + data[i].Phone + "</p> <p class='pf2'> <p class='pf2'>Ciprin: " + data[i].Ciprin + "</p> <p class='pf2'>" +  'Unido el ' + data[i].CreationDate + "</p> <p class='pf4'>" + data[i].CreationHourZone + "</p> <button style='background:red; color:white' class='moreResult' id='" + data[i].Id + "' onclick='changeP(this)'>Activar</button> </div> </div>");
                                }
                            }
                        }

                        
                        $('#bannerState').css('background','green');
                        $('#bannerState').css('color','white');
                        $('#bannerState').text('El usuario tiene ' + i + ' perfiles!');
                        $('#listResults').css('display','flex');
                        $('#listResults').append(chain.toString());
                        chain.clear();

                        for(var i = 0; i < data.length; i++)
                        {
                            document.getElementById(i).style.background = 'url("' + data[i].Avatar + '")';
                        }
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

function changeP(e)
{
    $('#' + e.id).css('background','yellow');
    $('#' + e.id).css('color','black');
    $('#' + e.id).text('Cambiando ...');

    $.ajax
    (
        {
            url: '../api/person?idPersonA=' + e.id,
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

function changeOP(e)
{
    $.ajax
    (
        {
            url: '../api/otherPerson?idOtherPersonA=' + e.id,
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

function StringBuilder(value) 
{
    this.strings = new Array();
    this.append(value);
}

StringBuilder.prototype.append = function (value) 
{
    if (value) 
    {
        this.strings.push(value);
    }
}

StringBuilder.prototype.clear = function () 
{
    this.strings.length = 0;
}

StringBuilder.prototype.toString = function () 
{
    return this.strings.join("");
}