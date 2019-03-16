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

                    

                    for(var i = 0; i < data.length; i++)
                    {
                        if(data[i].Ciprin)
                        {
                            chain.append("<div class='result'> <div class='avatar' id='" + data[i].Id + "'></div> <div class='text'> <p class='pf1'>" + data[i].Name + "</p> <p class='pf2'>" + data[i].ProfesionDescription + "</p> <p class='pf2'>" + data[i].Email + "</p> <p class='pf2'>" + data[i].Phone + "</p> <p class='pf2'>Creado el " + data[i].CreationDate + ' por ' + data[i].Username +  "</p> <p class='pf4'>" + data[i].CreationHourZone +  "</p> <button id='" + data[i].Id + "' class='moreResult' onclick='showMedia(this)'>Multimedia</button> <p style='background:green; color:white; padding: 4px;'>Afiliado a CIPRIN</p> <p class='pf3'>" + data[i].Views +  " visitas</p> </div> </div>");
                            
                        }

                        else
                        {
                            chain.append("<div class='result'> <div class='avatar' id='" + data[i].Id + "'></div> <div class='text'> <p class='pf1'>" + data[i].Name + "</p> <p class='pf2'>" + data[i].ProfesionDescription + "</p> <p class='pf2'>" + data[i].Email + "</p> <p class='pf2'>" + data[i].Phone + "</p> <p class='pf2'>Creado el " + data[i].CreationDate + ' por ' + data[i].Username +  "</p> <p class='pf4'>" + data[i].CreationHourZone +  "</p> <button id='" + data[i].Id + "' class='moreResult' onclick='showMedia(this)'>Multimedia</button> <p class='pf3'>" + data[i].Views +  " visitas</p> </div> </div>");
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
       new google.maps.Marker({
        position: {lat: crd.latitude, lng: crd.longitude},
        map: map,
        title: 'Hello World!'
        });

        var ca = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
    '<div id="bodyContent">'+
    '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
    'sandstone rock formation in the southern part of the '+
    'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
    'south west of the nearest large town, Alice Springs; 450&#160;km '+
    '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
    'features of the Uluru - Kata Tjuta National Park. Uluru is '+
    'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
    'Aboriginal people of the area. It has many springs, waterholes, '+
    'rock caves and ancient paintings. Uluru is listed as a World '+
    'Heritage Site.</p>'+
    '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
    'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
    '(last visited June 22, 2009).</p>'+
    '</div>'+
    '</div>';

        for(var i = 0; i < 4; i++)
        {
            putMarker({lat: crd.latitude + i/1000, lng: crd.longitude + i/1000}, ca);
        }
    }
    function error(){}
    navigator.geolocation.getCurrentPosition(success, error, options);
}

function putMarker(latLng, card)
{
    

    var infowindow = new google.maps.InfoWindow({content: card});
    var marker = new google.maps.Marker({position: latLng, map: map, title: '<font color="green">This is some text!</font> another text'});
    marker.addListener('click', function() {infowindow.open(map, marker);});
}