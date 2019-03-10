window.onload = initUser;
var mapa, gmaps, f, t, y, g;

f = 'https://www.facebook.com/Elite-Intelligence-Group-260263604734008/';
t = 'https://twitter.com/EliteIntellige1?lang=es';
y = 'https://www.youtube.com/channel/UCOvdAjzfv4WlwxKc1fi5JYQ';
g = 'https://plus.google.com/u/0/109910140252090488175';

function initUser()
{
    var name     = localStorage.getItem('Name');
    var username = localStorage.getItem('Username');
    var email    = localStorage.getItem('Email');
    if(name != null)
    {
        if(email != null)
        {
            location.href = 'menuAdministrator.html';
        }

        else
        {
            $('#infoName').text(name);
            $('#infoUsername').text(username);
        }
    }
    else
    {
        location.href = 'index.html';
    }
}

function search()
{
    $('#listResults').empty();
    $('#listResults').hide();
    $('#bannerState').css('display','block');
    $('#bannerState').css('background','yellow');
    $('#bannerState').css('color','black');
    $('#bannerState').text('Buscando ...');

    var criterio = document.getElementById('criterio').value;

    $.ajax
    (
        {
            url: '../api/person/?criterio=' + criterio,
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
                        if(data[i].Ciprin)
                        {
                            chain.append("<div class='result'> <div class='avatar' id='" + i + "'></div> <div class='text'> <p class='pf1'>" + data[i].Name + "</p> <p class='pf2'>" + data[i].ProfesionDescription + "</p> <p class='pf2'>" + data[i].Email + "</p> <p class='pf2'>" + data[i].Phone + "</p> <p class='pf2'>Creado el " + data[i].CreationDate + ' por ' + data[i].Username +  "</p> <p class='pf4'>" + data[i].CreationHourZone +  "</p> <button id='" + data[i].Id + "' class='moreResult' onclick='showMedia(this)'>Multimedia</button> <p style='background:green; color:white; padding: 4px;'>Afiliado a CIPRIN</p> <p class='pf3'>" + data[i].Views +  " visitas</p> </div> </div>");
                        }

                        else
                        {
                            chain.append("<div class='result'> <div class='avatar' id='" + i + "'></div> <div class='text'> <p class='pf1'>" + data[i].Name + "</p> <p class='pf2'>" + data[i].ProfesionDescription + "</p> <p class='pf2'>" + data[i].Email + "</p> <p class='pf2'>" + data[i].Phone + "</p> <p class='pf2'>Creado el " + data[i].CreationDate + ' por ' + data[i].Username +  "</p> <p class='pf4'>" + data[i].CreationHourZone +  "</p> <button id='" + data[i].Id + "' class='moreResult' onclick='showMedia(this)'>Multimedia</button> <p class='pf3'>" + data[i].Views +  " visitas</p> </div> </div>");
                        }
                    }
                
                    $('#listResults').css('display','flex');
                    $('#listResults').append(chain.toString());
                    chain.clear();

                    for(var i = 0; i < data.length; i++)
                    {
                        document.getElementById(i).style.background = 'url("' + data[i].Avatar + '")';
                    }

                    $('#bannerState').css('background','green');
                    $('#bannerState').css('color','white');
                    $('#bannerState').text(i + ' Resultados!');
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

function searchByEnter(e)
{
    if (e.keyCode === 13 && !e.shiftKey){search();}
}

function to(num)
{
    switch(num)
    {
        case 1:
        location.href = 'menu.html';
        break;
        case 2:
        location.href = 'menu2.html';
        break;
        case 3:
        location.href = 'menu3.html';
        break;
        case 4:
        location.href = 'productos.html';
        break;
        case 5:
        location.href = 'menu5.html';
        break;
        case 6:
        location.href = 'menu6.html';
        break;
        case 7:
        location.href = 'menu7.html';
        break;
        case 8:
        location.href = 'menu8.html';
        break;
        case 9:
        location.href = 'menu9.html';
        break;
        case 10:
        localStorage.clear();
        location.href = 'index.html';
        break;
        default:
        location.href = 'personPanel.html';
    }
}

function showMedia(e)
{
    localStorage.setItem('IdPerson', e.id);
    window.open('viewMediaPerson.html', '_blank');
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

/*
function startMap()
{
    var lat, log;
    gmaps = document.getElementById('maps');
    gmaps.style = 'display: block';
    navigator.geolocation.getCurrentPosition(function(position)
    { 
        lat = position.coords.latitude;
        log = position.coords.longitude;
        mapa = new google.maps.Map(gmaps, {zoom: 15, center: {lat: lat, lng: log}});
        
    });

    for(var i = 0; i < 10; i++)
    {
        var marker = new google.maps.Marker({position: {lat: lat + i/100, lng: log + i/100}});
        alert(i);
        marker.setMap(mapa);
    }
}

function startMap() {
    var myLatLng = {lat: -25.363, lng: 131.044};
  
    var map = new google.maps.Map(document.getElementById('maps'), {
      zoom: 4,
      center: myLatLng
    });
  
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Hello World!'
    });
  }

  function hideMap()
{
    gmaps.style = 'display: none';
}
*/