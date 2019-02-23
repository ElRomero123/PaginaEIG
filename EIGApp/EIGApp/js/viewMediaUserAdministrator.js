window.onload = initUser;

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
                            if(data[i].Active == 1)
                            {
                                if(data[i].Type)
                                {
                                    cadena += "<div class='result'> <div class='avatar' id='" + i + "'></div> <div class='text'> <p class='pf1'>" + data[i].Name + "</p> <p class='pf2'>" + data[i].ProfesionDescription + "</p> <p class='pf3'>" + data[i].Email + "</p> <p class='pf4'>" + data[i].Phone + "</p> <p class='pf4'>" + 'Unido el ' + data[i].CreationDate + "</p> <button id='" + data[i].Id + "' class='moreResult' onclick='showMedia(this)'>Multimedia</button> <button class='moreResult' id='s" + data[i].Id + "' onclick='flipOP(this)'>Desactivar</button> </div> </div>";
                                }

                                else
                                {
                                    cadena += "<div class='result'> <div class='avatar' id='" + i + "'></div> <div class='text'> <p class='pf1'>" + data[i].Name + "</p> <p class='pf2'>" + data[i].ProfesionDescription + "</p> <p class='pf3'>" + data[i].Email + "</p> <p class='pf4'>" + data[i].Phone + "</p> <p class='pf4'>" + 'Unido el ' + data[i].CreationDate + "</p> <button id='" + data[i].Id + "' class='moreResult' onclick='showMedia(this)'>Multimedia</button> <button class='moreResult' id='s" + data[i].Id + "' onclick='flip(this)'>Desactivar</button> </div> </div>";
                                }   
                            }

                            else
                            {
                                if(data[i].Type)
                                {
                                    cadena += "<div class='result'> <div class='avatar' id='" + i + "'></div> <div class='text'> <p class='pf1'>" + data[i].Name + "</p> <p class='pf2'>" + data[i].ProfesionDescription + "</p> <p class='pf3'>" + data[i].Email + "</p> <p class='pf4'>" + data[i].Phone + "</p> <p class='pf4'>" + 'Unido el ' + data[i].CreationDate + "</p> <button id='" + data[i].Id + "' class='moreResult' onclick='showMedia(this)'>Multimedia</button> <button class='moreResult' id='s" + data[i].Id + "' onclick='flipOP(this)'>Activar</button> </div> </div>";
                                }

                                else
                                {
                                    cadena += "<div class='result'> <div class='avatar' id='" + i + "'></div> <div class='text'> <p class='pf1'>" + data[i].Name + "</p> <p class='pf2'>" + data[i].ProfesionDescription + "</p> <p class='pf3'>" + data[i].Email + "</p> <p class='pf4'>" + data[i].Phone + "</p> <p class='pf4'>" + 'Unido el ' + data[i].CreationDate + "</p> <button id='" + data[i].Id + "' class='moreResult' onclick='showMedia(this)'>Multimedia</button> <button class='moreResult' id='s" + data[i].Id + "' onclick='flip(this)'>Activar</button> </div> </div>";
                                } 
                            }
                        }

                        $('#listResults').append(cadena);

                        for(var i = 0; i < data.length; i++)
                        {
                            if(data[i].Active == 1)
                            {
                                $('#s' + data[i].Id).css('background','green');
                                $('#s' + data[i].Id).css('color','white');
                            }

                            else
                            {
                                $('#s' + data[i].Id).css('background','red');
                                $('#s' + data[i].Id).css('color','white');
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

function flip(e)
{
    $('#s' + e.id).css('background','yellow');
    $('#s' + e.id).css('color','black');
    $('#s' + e.id).text('Cambiando ...');

    $.ajax
    (
        {
            url: '../api/person?id=' + e.id,
            type: 'POST',
            contentType: "application/json;charset=utf-8",

            success:
            function (data) 
            {
                if(data == 1)
                {
                    $('#s' + e.id).css('background','green');
                    $('#s' + e.id).css('color','white');
                    $('#s' + e.id).text('Desactivar');
                }

                else
                {
                    $('#s' + e.id).css('background','red');
                    $('#s' + e.id).css('color','white');
                    $('#s' + e.id).text('Activar');
                }
            }
        }
    );
}

function flipOP(e)
{
    $('#s' + e.id).css('background','yellow');
    $('#s' + e.id).css('color','black');
    $('#s' + e.id).text('Cambiando ...');

    $.ajax
    (
        {
            url: '../api/otherPerson?id=' + e.id,
            type: 'POST',
            contentType: "application/json;charset=utf-8",

            success:
            function (data) 
            {
                if(data == 1)
                {
                    $('#s' + e.id).css('background','green');
                    $('#s' + e.id).css('color','white');
                    $('#s' + e.id).text('Desactivar');
                }

                else
                {
                    $('#s' + e.id).css('background','red');
                    $('#s' + e.id).css('color','white');
                    $('#s' + e.id).text('Activar');
                }
            }
        }
    );
}