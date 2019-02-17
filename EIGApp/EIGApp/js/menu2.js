window.onload = initUser;
var fichero, fileReference;
var mapa;

function initUser()
{
    var name     = localStorage.getItem('Name');
    var username = localStorage.getItem('Username');
    
    if(name != null)
    {
        $('#infoName').text(name);
        $('#infoUsername').text(username);
        startMap();
    }

    else
    {
        location.href = 'index.html';
    }

    fichero = document.getElementById('fileBrowser');
}

function cerrarSesion()
{
    localStorage.clear();
    location.href = 'index.html';
}

function search()
{
    if(navigator.onLine)
    {
        $('#listResults').empty();
        $('#listResults').hide();
        $('#bannerState').css('display','block');
        $('#bannerState').css('background','yellow');
        $('#bannerState').css('color','black');
        $('#bannerState').text('Buscando otros perfiles ...');
    
        var criterio = document.getElementById('criterio').value;

        $.ajax
        (
            {
                url: '../api/otherPerson/?cadena=' + criterio,
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
                            if(data[i].Ciprin == 1)
                            {
                                cadena += "<div class='result'> <div class='avatar' id='" + i + "'></div> <div class='text'> <p class='pf1'>" + data[i].Name + "</p> <p class='pf2'>" + data[i].Profesion + "</p> <p class='pf2'>" + data[i].ProfesionDescription + "</p> <p class='pf3'>" + data[i].Email + "</p> <p class='pf4'>" + data[i].Phone + "</p> <p class='pf4'>" + data[i].City + "</p> <p class='pf4'>" + data[i].Address + "</p> <p class='pf4'>" + 'Unido el ' + data[i].CreationDate + "</p> <p class='c'>Pertenece a CIPRIN</p> </div> </div>";
                            }
                            else
                            {
                                cadena += "<div class='result'> <div class='avatar' id='" + i + "'></div> <div class='text'> <p class='pf1'>" + data[i].Name + "</p> <p class='pf2'>" + data[i].Profesion + "</p> <p class='pf2'>" + data[i].ProfesionDescription + "</p> <p class='pf3'>" + data[i].Email + "</p> <p class='pf4'>" + data[i].Phone + "</p> <p class='pf4'>" + data[i].City + "</p> <p class='pf4'>" + data[i].Address + "</p> <p class='pf4'>" + 'Unido el ' + data[i].CreationDate + "</p> </div> </div>";  
                            }        
                            
                            putMarket({lat: data[i].Latitude, lng: data[i].Longitude}, data[i].Avatar);
                        } 

                        $('#listResults').append(cadena);

                        for(var i = 0; i < data.length; i++)
                        {
                            document.getElementById(i).style.background = 'url("' + data[i].Avatar + '")';
                        }

                        $('#bannerState').css('background','green');
                        $('#bannerState').css('color','white');
                        $('#bannerState').text(i + ' resultados encontrados!');
                        $('#listResults').css('display','flex'); 
                    }

                    else
                    {
                        $('#bannerState').css('background','red');
                        $('#bannerState').css('color','white');
                        $('#bannerState').text('Sin resultados!');
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

function searchByEnter(e)
{
    if (e.keyCode === 13 && !e.shiftKey) 
    {
        search();
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
        case 2:
        location.href = 'otherPersonPanel.html';
        break;
        default:
        location.href = 'menu.html';
    }
}

function startMap()
{
    navigator.geolocation.getCurrentPosition(function(position)
    { 
        console.log(position);
        mapa = new google.maps.Map(document.getElementById('maps'), {zoom: 15, center: {lat: position.coords.latitude, lng: position.coords.longitude}});
    });
}

function putMarket(loc, avatar)
{
    var image = {
        url: avatar,
        scaledSize: new google.maps.Size(35, 35)
      };

    marker = new google.maps.Marker({position: loc, map: mapa, icon: image});
}