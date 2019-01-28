window.onload = initUser;
var FileCase;

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

function loadAnexos()
{
    if(navigator.onLine)
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
                url: '../api/multimediaCase/?idCase=' + idCase,
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
                            cadena += "<div class='result'> <div class='text'> <p class='pf2'>" + data[i].FileName + "</p> <p class='pf4'>Anexado el " + data[i].LoadDate + "</p> <button id='" + data[i].Id + "' class='deleteResult' onclick='eliminar(this)'>Eliminar</button> <button id='" + data[i].Id + "' class='moreResult' onclick='download(this)'>Descargar</button> <p hidden class='pf4' id='DL" + data[i].Id + "'>" + data[i].DownloadLink + "</p> </div> </div>";  
                        }
                        
                        $('#listResults').append(cadena);

                        $('#bannerState').css('background','green');
                        $('#bannerState').css('color','white');
                        $('#bannerState').text('El caso tiene ' + i + ' anexos!');
                        $('#listResults').css('display','flex');
                    }

                    else
                    {
                        $('#bannerState').css('background','red');
                        $('#bannerState').css('color','white');
                        $('#bannerState').text('El caso no tiene anexos!');
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
        var multimediaCase =
        {
            fileName: '',
            downloadLink: '',
            idCase: localStorage.getItem('Case')
        };
    
        $('#loadFC').css('background','yellow');
        $('#loadFC').css('border','2px solid yellow');
        $('#loadFC').css('color','black');
        $('#loadFC').text('Anexando archivo ...');

        $.ajax
        (
            {
                url: '../api/multimediaCase',
                type: 'POST',
                data: JSON.stringify(multimediaCase),
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

function loadFile(num)
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
    var fileName = num + FileCase.files[0].name;
    var uploadTask = storageRef.child('anexosCase/' + fileName).put(FileCase.files[0]);

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
                    $('#loadFC').text('Archivo anexado con éxito!');
                    setTimeout(recargar, 200);
                }
            }
        }
    );
}

function validateFile()
{
    return FileCase.files[0] != null;
}

function recargar()
{
    location.reload();
}

function eliminar(e)
{
    $.ajax
    (
        {
            url: '../api/multimediaCase/?idMC=' + e.id,
            type: 'POST',
            contentType: "application/json;charset=utf-8",

            success:
            function (data) 
            {
                if(data)
                {
                    $('#bannerState').css('background','brown');
                    $('#bannerState').text('El anexo ha sido eliminado!');
                    setTimeout(recargar, 800);
                }

                else
                {
                    alert('NO se pudo eliminar el anexo!');
                }
            }
        }
    );
}