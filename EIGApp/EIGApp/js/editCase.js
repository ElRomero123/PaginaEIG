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
                            cadena += "<div id='" + data[i].Id + "' class='result' onclick='download(this)'> <div class='text'> <p class='pf1'>" + data[i].DownloadLink + "</p> </div> </div>";  
                        }
                        
                        $('#listResults').append(cadena);

                        $('#bannerState').css('background','green');
                        $('#bannerState').css('color','white');
                        $('#bannerState').text('Usted tiene ' + i + ' anexos!');
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
    alert(e.id);
}

function loadFileCase()
{
    FileCase =  document.getElementById('fileCase');

    if(validateFile())
    {
        var multimediaCase =
        {
            downloadLink: '',
            idCase: localStorage.getItem('Case')
        };
    
        $('#loadFC').css('background','yellow');
        $('#loadFC').css('border','2px solid yellow');
        $('#loadFC').css('color','black');
        $('#loadFC').text('Anexando fichero ...');

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
    var uploadTask = storageRef.child('anexosCase/' + num + FileCase.files[0].name).put(FileCase.files[0]);

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
                putFile(num, downloadURL);
            });
        }
    );
}

function putFile(num, downloadURL)
{
    var parametroPutFileCase =
    {
        id: num,
        downloadURL: downloadURL
    };

    $.ajax
    (
        {
            url: '../api/parametroFileCase',
            type: 'POST',
            data: JSON.stringify(parametroPutFileCase),
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
                    setTimeout(recargar, 2500);
                }
            }
        }
    );
}

function validateFile()
{
    return FileCase.files[0] != null;
}