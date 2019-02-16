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

    loadCases();
}

function loadCases()
{
    if(navigator.onLine)
    {
        $('#listResults').empty();
        $('#listResults').hide();
        $('#bannerState').css('display','block');
        $('#bannerState').css('background','yellow');
        $('#bannerState').css('color','black');
        $('#bannerState').text('Cargando tus casos ...');

        var idUser = localStorage.getItem('User');

        $.ajax
        (
            {
                url: '../api/case/?idUser=' + idUser,
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
                            cadena += "<div class='result'> <div class='text'> <p class='pf1'>" + data[i].Name + "</p> <p class='pf2'>" + data[i].DescriptionCase + "</p> <p class='pf3'> Publicado el " + data[i].PostedDate + "</p> <button id='" + data[i].Id + "' class='deleteResult' onclick='eliminar(this)'>Eliminar</button> <button id='" + data[i].Id + "' class='moreResult' onclick='toEditCase(this)'>Ver anexos</button> </div> </div>";  
                        }
                        
                        $('#listResults').append(cadena);

                        $('#bannerState').css('background','green');
                        $('#bannerState').css('color','white');
                        $('#bannerState').text('Usted tiene ' + i + ' casos!');
                        $('#listResults').css('display','flex');
                    }

                    else
                    {
                        $('#bannerState').css('background','red');
                        $('#bannerState').css('color','white');
                        $('#bannerState').text('Aún no has subido un caso!');
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
        location.href = 'menu5.html';
    }
}

function toEditCase(e)
{
    localStorage.setItem('Case', e.id);
    location.href = 'editCase.html';
}

function eliminar(e)
{
    $.ajax
    (
        {
            url: '../api/case/?idCase=' + e.id,
            type: 'POST',
            contentType: "application/json;charset=utf-8",

            success:
            function (data) 
            {
                if(data)
                {
                    $('#bannerState').css('background','brown');
                    $('#bannerState').text('Tu caso ha sido eliminado!');
                    setTimeout(recargar, 800);
                }

                else
                {
                    alert('NO se pudo eliminar el caso! ');
                }
            }
        }
    );
}

function recargar()
{
    location.reload();
}