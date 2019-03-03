window.onload = initUser;

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
                        var cadena = "";

                        for(var i = 0; i < data.length; i++)
                        {
                            if(data[i].Type)
                            {
                                cadena += "<div class='result'> <div class='text'> <p class='pf1'>" + data[i].Name + "</p> <p class='pf2'>" + data[i].ProfesionDescription + "</p> <p class='pf3'>" + data[i].Email + "</p> <p class='pf3'>" + data[i].Phone + "</p> <p class='pf4'>El perfil está activado: " + data[i].Active + "</p> <p class='pf4'>Profesional afín</p> <p class='pf4'>Pertenece a CIPRIN: " + data[i].Ciprin + "</p> <button id='" + data[i].Id + "' class='deleteResult' onclick='elim(2, this)'>Eliminar</button> <button id='" + data[i].Id + "' class='moreResult' onclick='toEdit(2, this)'>Files</button> </div> </div>";
                            }
                            else
                            {
                                cadena += "<div class='result'> <div class='text'> <p class='pf1'>" + data[i].Name + "</p> <p class='pf2'>" + data[i].ProfesionDescription + "</p> <p class='pf3'>" + data[i].Email + "</p> <p class='pf3'>" + data[i].Phone + "</p> <p class='pf4'>El perfil está activado: " + data[i].Active + "</p> <p class='pf4'>Investigador Privado</p> <p class='pf4'>Pertenece a CIPRIN: " + data[i].Ciprin + "</p> <button id='" + data[i].Id + "' class='deleteResult' onclick='elim(1, this)'>Eliminar</button> <button id='" + data[i].Id + "' class='moreResult' onclick='toEdit(1, this)'>Files</button> </div> </div>";
                            }
                        }
                        
                        $('#listResults').append(cadena);

                        $('#bannerState').css('background','green');
                        $('#bannerState').css('color','white');
                        $('#bannerState').text('Tiene ' + i + ' perfiles!');
                        $('#listResults').css('display','flex');
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
        else
        {
            location.href = 'otherPersonPanel.html';
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
                url: '../api/person/?idPerson=' + e.id,
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
                url: '../api/otherPerson/?idOtherPerson=' + e.id,
                type: 'POST',
                contentType: "application/json;charset=utf-8",
    
                success:
                function (data) 
                {
                    deleteFile(data, 2);
                }
            }
        );
    }  
}

function deleteFile(fileName, opt)
{
    var config = 
    {
        apiKey: "AIzaSyA4F7aYKhXv5zEWabtUYABA-4lJJdAgyW4",
        authDomain: "eliteintelligencegroup-719d3.firebaseapp.com",
        databaseURL: "https://eliteintelligencegroup-719d3.firebaseio.com",
        projectId: "eliteintelligencegroup-719d3",
        storageBucket: "eliteintelligencegroup-719d3.appspot.com",
        messagingSenderId: "567347907651"
    };

    firebase.initializeApp(config);

    var storageRef = firebase.storage().ref();

    switch(opt)
    {
        case 1:
            var desertRef = storageRef.child('avatarP/' + fileName);
        break;
        default:
            var desertRef = storageRef.child('avatarOP/' + fileName);
    }
    
    desertRef.delete().then
    (
        function() 
        {
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