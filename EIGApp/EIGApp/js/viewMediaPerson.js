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

    loadMediaPerson();
}

function loadMediaPerson()
{
    if(navigator.onLine)
    {
        $('#listResults').empty();
        $('#listResults').hide();
        $('#bannerState').css('display','block');
        $('#bannerState').css('background','yellow');
        $('#bannerState').css('color','black');
        $('#bannerState').text('Cargando ...');

        var idPerson = localStorage.getItem('IdPerson');

        $.ajax
        (
            {
                url: '../api/mediaPerson/?idPerson=' + idPerson,
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
                            cadena += "<div class='result'> <div class='text'> <p class='pf2'>" + data[i].FileName + "</p> <p class='pf4'>Anexado el " + data[i].LoadDate + "</p> <button id='" + data[i].Id + "' class='moreResult' onclick='download(this)'>Descargar</button> <p hidden class='pf4' id='DL" + data[i].Id + "'>" + data[i].DownloadLink + "</p> </div> </div>";  
                        }
                        
                        $('#listResults').append(cadena);

                        $('#bannerState').css('background','green');
                        $('#bannerState').css('color','white');
                        $('#bannerState').text('Archivos de este perfil ' + i);
                        $('#listResults').css('display','flex');
                    }

                    else
                    {
                        $('#bannerState').css('background','red');
                        $('#bannerState').css('color','white');
                        $('#bannerState').text('El perfil NO tiene archivos!');
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

function download(e)
{
    var download = document.getElementById('DL' + e.id).innerHTML;
    window.open(download, '_blank');
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
        location.href = 'menu.html';
    }
}