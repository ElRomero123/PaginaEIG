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

    loadJobApplications();
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

function toEditJA(e)
{
    localStorage.setItem('JA', e.id);
    location.href = 'editJA.html';
    //alert('Anexos ' + e.id);
}

function eliminar(e)
{
    alert('Eliminar ' + e.id);
}