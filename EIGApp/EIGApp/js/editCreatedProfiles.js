window.onload = initUser;
var config;

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

        config = 
        {
            apiKey: "AIzaSyA4F7aYKhXv5zEWabtUYABA-4lJJdAgyW4",
            authDomain: "eliteintelligencegroup-719d3.firebaseapp.com",
            databaseURL: "https://eliteintelligencegroup-719d3.firebaseio.com",
            projectId: "eliteintelligencegroup-719d3",
            storageBucket: "eliteintelligencegroup-719d3.appspot.com",
            messagingSenderId: "567347907651"
        };
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
                            cadena += "<div class='result'> <div class='text'> <p class='pf1'>" + data[i].Name + "</p> <p class='pf2'>" + data[i].ProfesionDescription + "</p> <p class='pf3'>" + data[i].Email + "</p> <p class='pf3'>" + data[i].Phone + "</p> <p class='pf4'>El perfil está activado: " + data[i].Active + "</p> <p class='pf4'>Pertenece a CIPRIN: " + data[i].Ciprin + "</p> <p class='pf4'> <p hidden id='A" + data[i].Id + "'class='pf4'>" + data[i].Avatar + "</p> <p id='T" + data[i].Id + "' class='pf4'>" + data[i].Type + "</p> <button id='" + data[i].Id + "' class='deleteResult' onclick='elim(this)'>Eliminar</button> <button id='" + data[i].Id + "' class='moreResult' onclick='toEdit(this)'>Files</button> <button id='" + data[i].Id + "' class='moreResult' onclick='avatar(this)'>Avatar</button> </div> </div>";
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

function toEdit(e)
{
    var cOption = document.getElementById('T' + e.id).innerHTML;
    
    if(cOption == "Investigador privado")
    {
        localStorage.setItem('ID', e.id);
        location.href = 'editMediaPerson.html';
    }

    else
    {
        localStorage.setItem('ID', e.id);
        location.href = 'editMediaOtherPerson.html';
    }
}

function elim(e)
{
    var cOption = document.getElementById('T' + e.id).innerHTML;

    if(cOption == "Investigador privado")
    {
        $.ajax
        (
            {
                url: '../api/person/?idPerson=' + e.id,
                type: 'POST',
                contentType: "application/json;charset=utf-8",

                success:
                function (data) 
                {
                    if(data)
                    {
                        deleteFile(data);
                    }

                    else
                    {
                        alert('NO se pudo eliminar el pefil!');
                    }
                }
            }
        );
    }

    else
    {
        $.ajax
        (
            {
                url: '../api/otherPerson/?idOtherPerson=' + e.id,
                type: 'POST',
                contentType: "application/json;charset=utf-8",
    
                success:
                function (data) 
                {
                    if(data)
                    {
                        deleteFile(data);
                    }
    
                    else
                    {
                        alert('NO se pudo eliminar el pefil!');
                    }
                }
            }
        );
    }
}

function deleteFile(fileName)
{
    firebase.initializeApp(config);

    var storageRef = firebase.storage().ref();
    var desertRef = storageRef.child(fileName);

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
        }
    );
}

function avatar(e)
{
    var url = document.getElementById('A' + e.id).innerHTML;
    window.open(url, '_blank');
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