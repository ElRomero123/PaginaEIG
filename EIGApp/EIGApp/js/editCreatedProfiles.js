window.onload = initUser;
var config, f, t, y, g;

f = 'https://www.facebook.com/Elite-Intelligence-Group-260263604734008/';
t = 'https://twitter.com/EliteIntellige1?lang=es';
y = 'https://www.youtube.com/channel/UCOvdAjzfv4WlwxKc1fi5JYQ';
g = 'https://plus.google.com/u/0/109910140252090488175';

config = 
{
    apiKey: "AIzaSyA4F7aYKhXv5zEWabtUYABA-4lJJdAgyW4",
    authDomain: "eliteintelligencegroup-719d3.firebaseapp.com",
    databaseURL: "https://eliteintelligencegroup-719d3.firebaseio.com",
    projectId: "eliteintelligencegroup-719d3",
    storageBucket: "eliteintelligencegroup-719d3.appspot.com",
    messagingSenderId: "567347907651"
};

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
                        var chain = new StringBuilder();
                        for(var i = 0; i < data.length; i++)
                        {
                            if(data[i].Type)
                            {
                                chain.append("<div class='result'> <div class='text'> <p class='pf1'>" + data[i].Name + "</p> <p class='pf2'>" + data[i].ProfesionDescription + "</p> <p class='pf2'>" + data[i].Email + "</p> <p class='pf2'>" + data[i].Phone + "</p> <p class='pf2'> <p class='pf2'>Ciprin: " + data[i].Ciprin + "</p> <p class='pf2'>Activo: " + data[i].Active + "</p> <p class='pf2'>" + 'Unido el ' + data[i].CreationDate + "</p> <p class='pf4'>" + data[i].CreationHourZone + "</p> <button class='moreResult' id='" + data[i].Id + "' onclick='toEdit(2,this)'>Editar media</button> <button class='deleteResult' id='" + data[i].Id + "' onclick='elim(2,this)'>Eliminar</button> <p class='pf2' style='background:blue; padding:3px; color:white;'>Profesional Afín</p> <p class='pf2'>" + data[i].Views + " visitas</p> </div> </div>");
                            }
                            else
                            {
                                chain.append("<div class='result'> <div class='text'> <p class='pf1'>" + data[i].Name + "</p> <p class='pf2'>" + data[i].ProfesionDescription + "</p> <p class='pf2'>" + data[i].Email + "</p> <p class='pf2'>" + data[i].Phone + "</p> <p class='pf2'> <p class='pf2'>Ciprin: " + data[i].Ciprin + "</p> <p class='pf2'>Activo: " + data[i].Active + "</p> <p class='pf2'>" + 'Unido el ' + data[i].CreationDate + "</p> <p class='pf4'>" + data[i].CreationHourZone + "</p> <button class='moreResult' id='" + data[i].Id + "' onclick='toEdit(1,this)'>Editar media</button> <button class='deleteResult' id='" + data[i].Id + "' onclick='elim(1,this)'>Eliminar</button> <p class='pf2' style='background:green; padding:3px; color:white;'>Investigador Privado</p> <p class='pf2'>" + data[i].Views + " visitas</p> </div> </div>");
                            }
                        }
                        
                        $('#bannerState').css('background','green');
                        $('#bannerState').css('color','white');
                        $('#bannerState').text('Tiene ' + i + ' perfiles!');
                        $('#listResults').css('display','flex');
                        $('#listResults').append(chain.toString());
                        chain.clear();
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
        var call = localStorage.getItem('Call');
        if(call == 1)
        {
            location.href = 'personPanel.html';
        }
        else if (call == 2)
        {
            location.href = 'otherPersonPanel.html';
        }
        else if (call == 3)
        {
            location.href = 'personPanelC.html';
        }
        else
        {
            location.href = 'otherPersonPanelC.html';
        }
    }
}

function toEdit(opc, e)
{   
    switch(opc)
    {
        case 1:
        localStorage.setItem('ID', e.id);
        location.href = 'editMediaPerson.html';
        break;
        default:
        localStorage.setItem('ID', e.id);
        location.href = 'editMediaOtherPerson.html';
    }
}

function elim(opc, e)
{
    switch(opc)
    {
        case 1:
        $.ajax
        (
            {
                url: '../api/putAvatar/?idPerson=' + e.id,
                type: 'POST',
                contentType: "application/json;charset=utf-8",

                success:
                function (data) 
                {
                    deleteFile(data, 1);
                }
            }
        );
        break;
        default:
        $.ajax
        (
            {
                url: '../api/putAvatarOP/?idOtherPerson=' + e.id,
                type: 'POST',
                contentType: "application/json;charset=utf-8",
    
                success:
                function (data) 
                {
                    deleteFile(data, 2, e.id);
                }
            }
        );
    }  
}

function deleteFile(fileName, opt, id)
{
    firebase.initializeApp(config);

    var storageRef = firebase.storage().ref();

    switch(opt)
    {
        case 1:
        var desertRef = storageRef.child('avatarP/' + fileName);
        break;
        default:
        var desertRef = storageRef.child('filesOtherPerson/' + fileName);
    }
    
    desertRef.delete().then
    (
        function() 
        {
            deleteMedia(opt);
            $('#bannerState').css('background','brown');
            $('#bannerState').text('Tu perfil ha sido eliminado!');
            setTimeout(recargar, 500);
        }
    ).catch
    (
        function(error) 
        {
            alert('NO se pudo eliminar el pefil! ' + error);
        }
    );
}

function recargar()
{
    location.reload();
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