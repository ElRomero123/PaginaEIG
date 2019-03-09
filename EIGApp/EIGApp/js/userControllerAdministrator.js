window.onload = initUser;
var f = 'https://www.facebook.com/Elite-Intelligence-Group-260263604734008/';
var t = 'https://twitter.com/EliteIntellige1?lang=es';
var y = 'https://www.youtube.com/channel/UCOvdAjzfv4WlwxKc1fi5JYQ';
var g = 'https://plus.google.com/u/0/109910140252090488175';

function initUser()
{
    var name     = localStorage.getItem('Name');
    var email = localStorage.getItem('Email');
    
    if(name != null)
    {
        $('#infoName').text(name);
        $('#infoUsername').text(email);
        loadUsers();
    }

    else
    {
        location.href = 'index.html';
    }    
}

function loadUsers()
{
    $('#listResults').empty();
    $('#listResults').hide();
    $('#bannerState').css('display','block');
    $('#bannerState').css('background','yellow');
    $('#bannerState').css('color','black');
    $('#bannerState').text('Cargando ...');

    $.ajax
    (
        {
            url: '../api/user',
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
                        if(data[i].CountProfiles > 0)
                        {
                            chain.append("<div class='result'> <div class='text'> <p class='pf1'>" + data[i].Username + "</p> <p class='pf2'>" + data[i].Name + "</p> <p class='pf2'>" + data[i].Email + "</p> <p class='pf2'>" + data[i].Address + "</p> <p class='pf2'>Unido el " + data[i].JoinDate + "</p> <p class='pf4'>" + data[i].JoinHourZone + "</p> <button id='" + data[i].Id + "' class='moreResult' onclick='profilesUser(this)'>Mas</button> <p class='pf2'>Perfiles: " + data[i].CountProfiles + "</p> </div> </div>");
                        }

                        else
                        {
                            chain.append("<div class='result'> <div class='text'> <p class='pf1'>" + data[i].Username + "</p> <p class='pf2'>" + data[i].Name + "</p> <p class='pf2'>" + data[i].Email + "</p> <p class='pf2'>" + data[i].Address + "</p> <p class='pf2'>Unido el " + data[i].JoinDate + "</p> <p class='pf4'>" + data[i].JoinHourZone + "</p> <button id='" + data[i].Id + "' class='moreResult' onclick='profilesUser(this)'>Mas</button> <p class='pf2'>Sin perfiles</p> </div> </div>");
                        }
                    }
                    
                    $('#bannerState').css('background','green');
                    $('#bannerState').css('color','white');
                    $('#bannerState').text('Usuarios: ' + i);
                    $('#listResults').css('display','flex');
                    $('#listResults').append(chain.toString());
                    chain.clear();
                }

                else
                {
                    $('#bannerState').css('background','red');
                    $('#bannerState').css('color','white');
                    $('#bannerState').text('Sin Usuarios!');
                }
            }
        }
    );
}

function profilesUser(e)
{
    localStorage.setItem('IdUser', e.id);
    location.href = 'viewProfilesUserAdministrator.html';
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
        location.href = 'menuProfilesAdministrator.html';
    }
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