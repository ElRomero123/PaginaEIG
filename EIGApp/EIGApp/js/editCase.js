window.onload = initUser;
var FileCase,f,t,y,g,config;

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
    loadAnexos();
}

function loadAnexos()
{
    $('#listResults').empty();
    $('#listResults').hide();
    $('#bannerState').css('display','block');
    $('#bannerState').css('background','yellow');
    $('#bannerState').css('color','black');
    $('#bannerState').text('Cargando ...');
    var idCase = localStorage.getItem('Case');
    $.ajax
    (
        {
            url: '../api/mediaCase/?idCase=' + idCase,
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
                        chain.append("<div class='result'> <div class='text'> <p class='pf2'>" + data[i].FileName + "</p> <p class='pf2'>Anexado el " + data[i].LoadDate + "</p> <p class='pf4'>" + data[i].LoadHourZone + "</p> <button id='" + data[i].Id + "' class='deleteResult' onclick='elim(this)'>Eliminar</button> <button id='" + data[i].Id + "' class='moreResult' onclick='download(this)'>Descargar</button> <p hidden class='pf4' id='DL" + data[i].Id + "'>" + data[i].DownloadLink + "</p> </div> </div>");  
                    }
                    $('#bannerState').css('background','green');
                    $('#bannerState').css('color','white');
                    $('#bannerState').text(i + ' anexos!');
                    $('#listResults').css('display','flex');
                    $('#listResults').append(chain.toString());
                    chain.clear();
                }

                else
                {
                    $('#bannerState').css('background','red');
                    $('#bannerState').css('color','white');
                    $('#bannerState').text('Sin anexos!');
                }
            }
        }
    );
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
        location.href = 'manageCases.html';
    }
}

function elim(e)
{
    $('#loadFC').css('background','yellow');
    $('#loadFC').css('color','black');
    $('#loadFC').text('Eliminando ...');

    $.ajax
    (
        {
            url: '../api/mediaCase/?idMC=' + e.id,
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
                    $('#loadFC').css('background','red');
                    $('#loadFC').css('border','2px solid red');
                    $('#loadFC').text('Error!');
                }
            }
        }
    );
}

function deleteFile(fileName)
{
    firebase.initializeApp(config);
    var storageRef = firebase.storage().ref();
    var desertRef = storageRef.child('filesCase/' + fileName);

    desertRef.delete().then
    (
        function() 
        {
            $('#loadFC').css('background','darkgreen');
            $('#loadFC').css('border','2px solid darkgreen');
            $('#loadFC').css('color','white');
            $('#loadFC').text('Anexo eliminado!');
            setTimeout(recargar, 800);
        }
    ).catch(
        function(error) 
        {
        }
    );
}

function download(e)
{
    var download = document.getElementById('DL' + e.id).innerHTML;
    window.open(download, '_blank');
}

function loadFileCase()
{
    FileCase =  document.getElementById('fileCase');
    if(validateFile())
    {
        var mediaCase =
        {
            idCase: localStorage.getItem('Case')
        };
    
        $('#loadFC').css('background','yellow');
        $('#loadFC').css('border','2px solid yellow');
        $('#loadFC').css('color','black');
        $('#loadFC').text('Anexando ...');

        $.ajax
        (
            {
                url: '../api/mediaCase',
                type: 'POST',
                data: JSON.stringify(mediaCase),
                contentType: "application/json;charset=utf-8",

                success:
                function (data)
                {
                    loadFile(data);
                }
            }
        );
    }

    else
    {
        $('#loadFC').css('background','red');
        $('#loadFC').css('border','2px solid red');
        $('#loadFC').text('Debe seleccionar un fichero!');
    }
}

function validateFile()
{
    return FileCase.files[0] != null;
}

function loadFile(num)
{    
    firebase.initializeApp(config);
    var storageRef = firebase.storage().ref();
    var fileName = num + FileCase.files[0].name;
    var uploadTask = storageRef.child('filesCase/' + fileName).put(FileCase.files[0]);

    uploadTask.on
    (   
        'state_changed',
        function(snapshot)
        {

        },
        function(error)
        {
            
        },
        function()
        {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) 
            {    
                putFile(num, fileName, downloadURL);
            });
        }
    );
}

function putFile(num, fileName, downloadURL)
{
    var parametroPutFile =
    {
        id: num,
        fileName: fileName,
        downloadURL: downloadURL
    };

    $.ajax
    (
        {
            url: '../api/parametroFileCase',
            type: 'POST',
            data: JSON.stringify(parametroPutFile),
            contentType: "application/json;charset=utf-8",

            success:
            function (data)
            {
                if(data)
                {
                    $('#loadFC').css('background','darkgreen');
                    $('#loadFC').css('border','2px solid darkgreen');
                    $('#loadFC').css('color','white');
                    $('#loadFC').text('Anexado con éxito!');
                    setTimeout(recargar, 200);
                }
            }
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