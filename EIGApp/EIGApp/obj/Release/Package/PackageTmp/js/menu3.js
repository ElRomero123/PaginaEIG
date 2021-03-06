window.onload = initUser;
var mapa, gmaps;

var f = 'https://www.facebook.com/Elite-Intelligence-Group-260263604734008/';
var t = 'https://twitter.com/EliteIntellige1?lang=es';
var y = 'https://www.youtube.com/channel/UCOvdAjzfv4WlwxKc1fi5JYQ';
var g = 'https://plus.google.com/u/0/109910140252090488175';

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
        $('#bannerState').text('Buscando empresas ...');
    
        var criterio = document.getElementById('criterio').value;

        $.ajax
        (
            {
                url: '../api/business/?cadena=' + criterio,
                type: 'GET',
                contentType: "application/json;charset=utf-8",

                success:
                function (data) 
                {
                    if(data.length > 0)
                    {
                        startMap();
                        var cadena = "";
                        
                        for(var i = 0; i < data.length; i++)
                        {
                            if(data[i].Ciprin == 1)
                            {
                                cadena += "<div class='result'> <div class='avatar' id='" + i + "'></div> <div class='text'> <p class='pf1'>" + data[i].Name + "</p> <p class='pf2'>" + data[i].Specialism + "</p> <p class='pf2'>" + data[i].SpecialismDescription + "</p> <p class='pf3'>" + data[i].WebPage + "</p> <p class='pf4'>" + data[i].Phone + "</p> <p class='pf4'>" + 'Unido el ' + data[i].CreationDate + "</p> <p class='c'>Pertenece a CIPRIN</p> <button id='" + data[i].Id + "' class='moreResult' onclick='showMedia(this)'>Ver multimedia</button> </div> </div>";
                            }
                            else
                            {
                                cadena += "<div class='result'> <div class='avatar' id='" + i + "'></div> <div class='text'> <p class='pf1'>" + data[i].Name + "</p> <p class='pf2'>" + data[i].Specialism + "</p> <p class='pf2'>" + data[i].SpecialismDescription + "</p> <p class='pf3'>" + data[i].WebPage + "</p> <p class='pf4'>" + data[i].Phone + "</p> <p class='pf4'>" + 'Unido el ' + data[i].CreationDate + "</p> <button id='" + data[i].Id + "' class='moreResult' onclick='showMedia(this)'>Ver multimedia</button> </div> </div>";
                            }
                              
                        } 

                        $('#listResults').append(cadena);
                        $('#listResults').css('display','flex');

                        for(var i = 0; i < data.length; i++)
                        {
                            avatar = data[i].Avatar;
                            document.getElementById(i).style.background = 'url("' + avatar + '")';
                            putMarket({lat: data[i].Latitude, lng: data[i].Longitude}, avatar);
                        }

                        $('#bannerState').css('background','green');
                        $('#bannerState').css('color','white');
                        $('#bannerState').text(i + ' resultados encontrados!');
                    }

                    else
                    {
                        $('#bannerState').css('background','red');
                        $('#bannerState').css('color','white');
                        $('#bannerState').text('Sin resultados!');
                        hideMap();
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
        location.href = 'businessPanel.html';
        break;
        case 3:
        location.href = 'managePackage.html';
        localStorage.setItem('Call', 1);
        break;
        default:
        location.href = 'menu.html';
    }
}

function startMap()
{
    gmaps = document.getElementById('maps');
    gmaps.style = 'display: block';
    navigator.geolocation.getCurrentPosition(function(position)
    { 
        mapa = new google.maps.Map(gmaps, {zoom: 15, center: {lat: position.coords.latitude, lng: position.coords.longitude}});
    });
}

function putMarket(loc, avatar)
{
    var image = 
    {
        url: avatar,
        scaledSize: new google.maps.Size(35, 35)
    };

    marker = new google.maps.Marker({position: loc, map: mapa, icon: image});
}

function hideMap()
{
    gmaps.style = 'display: none';
}

function showMedia(e)
{
    localStorage.setItem('IdBusiness', e.id);
    window.open('viewMediaBusiness.html', '_blank');
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