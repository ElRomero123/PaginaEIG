window.onload = initUser;
var map, gmaps, f, t, y, g;

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
            initMap();
        }
    }
    else
    {
        location.href = 'index.html';
    }
}

function search()
{
    map = null;
    initMap();
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
                console.log(data);
                if(data.length > 0)
                {
                    var chain = new StringBuilder();
                    var card2;
                    for(var i = 0; i < data.length; i++)
                    {
                        if(data[i].Ciprin)
                        {
                            card2 = "<div class='text' style='color: black !important'> <p class='pf1'>" + data[i].Name + "</p> <p class='pf2'>" + data[i].ProfesionDescription + "</p> <p class='pf2'>" + data[i].Email + "</p> <p class='pf2'>" + data[i].Phone + "</p> <p class='pf2'>Creado el " + data[i].CreationDate + ' por ' + data[i].Username +  "</p> <p class='pf4'>" + data[i].CreationHourZone +  "</p> <button id='" + data[i].Id + "' style='background:green' class='moreResult' onclick='showMedia(this)'>Multimedia</button> <p style='background:green; color:white; padding: 4px;'>Afiliado a CIPRIN</p> <p class='pf3'>" + data[i].Views +  " visitas</p> </div>";
                            chain.append("<div class='result'> <div class='avatar' id='" + data[i].Id + "'></div> <div class='text'> <p class='pf1'>" + data[i].Name + "</p> <p class='pf2'>" + data[i].ProfesionDescription + "</p> <p class='pf2'>" + data[i].Email + "</p> <p class='pf2'>" + data[i].Phone + "</p> <p class='pf2'>Creado el " + data[i].CreationDate + ' por ' + data[i].Username +  "</p> <p class='pf4'>" + data[i].CreationHourZone +  "</p> <button id='" + data[i].Id + "' class='moreResult' onclick='showMedia(this)'>Multimedia</button> <p style='background:green; color:white; padding: 4px;'>Afiliado a CIPRIN</p> <p class='pf3'>" + data[i].Views +  " visitas</p> </div> </div>");
                            putMarker({lat:data[i].Latitude,lng:data[i].Longitude}, card2, data[i].Avatar);
                        }

                        else
                        {
                            card2 = "<div style='color: black; text-align:justify !important'> <p>" + data[i].Name + "</p> <p>" + data[i].ProfesionDescription + "</p> <p>" + data[i].Email + "</p> <p class='pf2'>" + data[i].Phone + "</p> <p class='pf2'>Creado el " + data[i].CreationDate + ' por ' + data[i].Username +  "</p> <p class='pf4'>" + data[i].CreationHourZone +  "</p> <button id='" + data[i].Id + "' style='background:green' onclick='showMedia(this)'>Multimedia</button> <p class='pf3'>" + data[i].Views +  " visitas</p> </div>";
                            chain.append("<div class='result'> <div class='avatar' id='" + data[i].Id + "'></div> <div class='text'> <p class='pf1'>" + data[i].Name + "</p> <p class='pf2'>" + data[i].ProfesionDescription + "</p> <p class='pf2'>" + data[i].Email + "</p> <p class='pf2'>" + data[i].Phone + "</p> <p class='pf2'>Creado el " + data[i].CreationDate + ' por ' + data[i].Username +  "</p> <p class='pf4'>" + data[i].CreationHourZone +  "</p> <button id='" + data[i].Id + "' class='moreResult' onclick='showMedia(this)'>Multimedia</button> <p class='pf3'>" + data[i].Views +  " visitas</p> </div> </div>");
                            putMarker({lat:data[i].Latitude,lng:data[i].Longitude}, card2, data[i].Avatar);
                        }
                    }

                    $('#listResults').css('display','flex');
                    $('#listResults').append(chain.toString());
                    chain.clear();
                    for(var i = 0; i < data.length; i++)
                    {
                        document.getElementById(data[i].Id).style.background = 'url("' + data[i].Avatar + '")';
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
        alert('Estamos construyendo una experiencia inigualable para empresas, esperala muy pronto!');
        break;
        case 4:
        alert('Estamos construyendo una experiencia inigualable para artículos, esperala muy pronto!');
        break;
        case 5:
        location.href = 'menu5.html';
        break;
        case 6:
        location.href = 'menu6.html';
        break;
        case 7:
        alert('Estamos construyendo una experiencia inigualable para CIPRIN, esperala muy pronto!');
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
    open('viewMediaPerson.html', 'pop-up', 'width=750,height=600');
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

function initMap() 
{
    var crd;
    var options = {enableHighAccuracy: true, timeout: 5000, maximumAge: 0};
    function success(pos)
    {
       crd = pos.coords;
       map = new google.maps.Map(document.getElementById('maps'), {zoom: 15, center: {lat: crd.latitude, lng: crd.longitude}});
    }
    function error(){}
    navigator.geolocation.getCurrentPosition(success, error, options);
}

function putMarker(latLng, card, avatar)
{
    var infowindow = new google.maps.InfoWindow({content: card});
    var marker= new google.maps.Marker({position: latLng, map: map, icon: {url:avatar, scaledSize: new google.maps.Size(50, 50)}});
    marker.addListener('click', function() {infowindow.open(map, marker);});
}