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

    loadProfiles();
}

function loadProfiles()
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
                            if(data[i].Type)
                            {
                                cadena += "<div class='result'> <div class='text'> <p class='pf1'>" + data[i].Name + "</p> <p class='pf2'>" + data[i].ProfesionDescription + "</p> <p class='pf3'> Publicado el " + data[i].Email + "</p> <p class='pf3'>" + data[i].Phone + "</p> <p class='pf4'>El perfil está activado: " + data[i].Active + "</p> <p class='pf4'>Pertenece a CIPRIN: " + data[i].Ciprin + "</p> <p class='pf4'>Profesional afín</p> <button id='" + data[i].Id + "' class='deleteResult' onclick='deleteOP(this)'>Eliminar</button> <button id='" + data[i].Id + "' class='moreResult' onclick='toEditOP(this)'>Multimedia</button> </div> </div>";
                            }
                            else
                            {
                                cadena += "<div class='result'> <div class='text'> <p class='pf1'>" + data[i].Name + "</p> <p class='pf2'>" + data[i].ProfesionDescription + "</p> <p class='pf3'> Publicado el " + data[i].Email + "</p> <p class='pf3'>" + data[i].Phone + "</p> <p class='pf4'>El perfil está activado: " + data[i].Active + "</p> <p class='pf4'>Pertenece a CIPRIN: " + data[i].Ciprin + "</p> <p class='pf4'>Investigador Privado</p> <button id='" + data[i].Id + "' class='deleteResult' onclick='deleteP(this)'>Eliminar</button> <button id='" + data[i].Id + "' class='moreResult' onclick='toEditP(this)'>Multimedia</button> </div> </div>";
                            }
                        }
                        
                        $('#listResults').append(cadena);

                        $('#bannerState').css('background','green');
                        $('#bannerState').css('color','white');
                        $('#bannerState').text('Tiene ' + i + ' perfiles!');
                        $('#listResults').css('display','flex');
                    }

                    else
                    {
                        $('#bannerState').css('background','red');
                        $('#bannerState').css('color','white');
                        $('#bannerState').text('NO tiene perfiles!');
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

function to(num)
{
    switch(num)
    {
        case 1:
        localStorage.clear();
        location.href = 'index.html';
        break;
        default:
        location.href = 'personPanel.html';
    }
}

function toEditP(e)
{
    localStorage.setItem('IdPerson', e.id);
    location.href = 'editMediaProfile.html';
}

function toEditOP(e)
{
    localStorage.setItem('IdOtherPerson', e.id);
}

function deleteP(e)
{
    $.ajax
    (
        {
            url: '../api/person/?idPerson=' + e.id,
            type: 'POST',
            contentType: "application/json;charset=utf-8",

            success:
            function (data) 
            {
                if(data)
                {
                    $('#bannerState').css('background','brown');
                    $('#bannerState').text('Tu perfil ha sido eliminado!');
                    setTimeout(recargar, 500);
                }

                else
                {
                    alert('NO se pudo eliminar el pefil!');
                }
            }
        }
    );
}

function deleteOP(e)
{
    $.ajax
    (
        {
            url: '../api/otherPerson/?idOtherPerson=' + e.id,
            type: 'POST',
            contentType: "application/json;charset=utf-8",

            success:
            function (data) 
            {
                if(data)
                {
                    $('#bannerState').css('background','brown');
                    $('#bannerState').text('Tu perfil ha sido eliminado!');
                    setTimeout(recargar, 500);
                }

                else
                {
                    alert('NO se pudo eliminar el pefil!');
                }
            }
        }
    );
}

function recargar()
{
    location.reload();
}