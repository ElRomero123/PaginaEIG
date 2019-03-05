window.onload = initUser;
var FileBusiness;
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

        loadMediaBusiness();
    }

    else
    {
        location.href = 'index.html';
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
        location.href = 'editCreatedProfiles.html';
    }
}

function loadMediaBusiness()
{
    if(navigator.onLine)
    {
        $('#listResults').empty();
        $('#listResults').hide();
        $('#bannerState').css('display','block');
        $('#bannerState').css('background','yellow');
        $('#bannerState').css('color','black');
        $('#bannerState').text('Cargando ...');

        var idBusiness = localStorage.getItem('ID');

        $.ajax
        (
            {
                url: '../api/mediaBusiness/?idBusiness=' + idBusiness,
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
                            cadena += "<div class='result'> <div class='text'> <p class='pf2'>" + data[i].FileName + "</p> <p class='pf4'>Anexado el " + data[i].LoadDate + "</p> <button id='" + data[i].Id + "' class='deleteResult' onclick='elim(this)'>Eliminar</button> <button id='" + data[i].Id + "' class='moreResult' onclick='download(this)'>Descargar</button> <p hidden class='pf4' id='DL" + data[i].Id + "'>" + data[i].DownloadLink + "</p> </div> </div>";  
                        }
                        
                        $('#listResults').append(cadena);

                        $('#bannerState').css('background','green');
                        $('#bannerState').css('color','white');
                        $('#bannerState').text('El negocio tiene ' + i + ' archivos!');
                        $('#listResults').css('display','flex');
                    }

                    else
                    {
                        $('#bannerState').css('background','red');
                        $('#bannerState').css('color','white');
                        $('#bannerState').text('Sin archivos!');
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

function loadFileBusiness()
{
    FileBusiness =  document.getElementById('fileBusiness');

    if(validateFile())
    {
        var IdBusiness = localStorage.getItem('ID');

        var mediaBusiness =
        {
            fileName    : '',
            downloadLink: '',
            idBusiness  : IdProduct
        };
    
        $('#loadFC').css('background','yellow');
        $('#loadFC').css('border','2px solid yellow');
        $('#loadFC').css('color','black');
        $('#loadFC').text('Subiendo archivo ...');

        $.ajax
        (
            {
                url: '../api/mediaBusiness',
                type: 'POST',
                data: JSON.stringify(mediaBusiness),
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
        $('#loadFC').text('Debe seleccionar un archivo!');
    }
}

function loadFile(num)
{
    firebase.initializeApp(config);

    var storageRef = firebase.storage().ref();
    var fileName = num + FileProduct.files[0].name;
    var uploadTask = storageRef.child('filesProduct/' + fileName).put(FileProduct.files[0]);

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
            url: '../api/parametroFilePR',
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
                    $('#loadFC').text('Archivo subido!');
                    setTimeout(recargar, 200);
                }
            }
        }
    );
}

function validateFile()
{
    return FileProduct.files[0] != null;
}

function download(e)
{
    var download = document.getElementById('DL' + e.id).innerHTML;
    window.open(download, '_blank');
}

function elim(e)
{
    $.ajax
    (
        {
            url: '../api/mediaProduct/?idMediaProduct=' + e.id,
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
                    alert('NO se pudo eliminar el archivo!');
                }
            }
        }
    );
}

function deleteFile(fileName)
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
    var desertRef = storageRef.child('filesProduct/' + fileName);
  
    desertRef.delete().then
    (
        function() 
        {
            $('#bannerState').css('background','brown');
            $('#bannerState').text('El archivo ha sido eliminado!');
            setTimeout(recargar, 500);
        }
    ).catch
    (
        function(error) 
        {
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