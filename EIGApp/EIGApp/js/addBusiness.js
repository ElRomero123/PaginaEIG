window.onload = initUser;
var BusinessAvatar;
var longitude;
var latitude;

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
        startMap();
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
        case 2:
        location.href = 'manageBusinessPackage.html';
        break;
        default:
        localStorage.removeItem('IdPackage');
        location.href = 'managePackage.html';
    }
}

function createBusiness()
{
    BusinessAvatar = document.getElementById('businessAvatar');

    if(validateText())
    {
        if(validateAvatar())
        {
            var IdPackage = localStorage.getItem('IdPackage');

            var negocio =
            {
                name:                   $('#cName').val(),
                specialism:             $('#cSpecialism').val(),
                specialismDescription:  $('#cDescription').val(),
                webPage:                $('#cWebPage').val(),
                phone:                  $('#cIndex').val().substr(0,4).trim() + ' ' + $('#cPhone').val(),
                latitude:               latitude,
                longitude:              longitude,
                ciprin:                 false,
                active:                 false,
                avatar:                 '',
                nameAvatar:             '',
                idPackage:              IdPackage
            };
        
            $('#createBusiness').css('background','yellow');
            $('#createBusiness').css('border','2px solid yellow');
            $('#createBusiness').css('color','black');
            $('#createBusiness').text('Registrando ...');
    
            $.ajax
            (
                {
                    url: '../api/business',
                    type: 'POST',
                    data: JSON.stringify(negocio),
                    contentType: "application/json;charset=utf-8",
    
                    success:
                    function (data)
                    {
                        loadAvatar(data);
                    }
                }
            );
        }
    
        else
        {
            $('#createBusiness').css('background','red');
            $('#createBusiness').css('border','2px solid red');
            $('#createBusiness').text('Debe seleccionar una FOTO de Avatar!');
        }
    }

    else
    {
        $('#createBusiness').css('background','red');
        $('#createBusiness').css('border','2px solid red');
        $('#createBusiness').text('Entradas invalidas!');
    }
}

function validateText()
{
    var c1 = $('#cName').val().length >= 8;
    var c2 = $('#cSpecialism').val().length >= 8;
    var c3 = $('#cDescription').val().length >= 8;
    var c4 = $('#cWebPage').val().length >= 8;
    var c5 = $('#cPhone').val().length >= 5;

    return c1 && c2 && c3 && c4 && c5;
}

function validateAvatar()
{
    return BusinessAvatar.files[0] != null;
}

function loadAvatar(num)
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
    var fileName   = 'B' + num;
    var uploadTask = storageRef.child('avatarB/' + fileName).put(BusinessAvatar.files[0]);

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
                putAvatar(num, fileName, downloadURL);
            });
        }
    );
}

function putAvatar(num, fileName, downloadURL)
{
    var parametrosPutAvatar =
    {
        id         : num,
        fileName   : fileName,
        downloadURL: downloadURL
    };

    $.ajax
    (
        {
            url: '../api/parametroBusiness',
            type: 'POST',
            data: JSON.stringify(parametrosPutAvatar),
            contentType: "application/json;charset=utf-8",

            success:
            function (data)
            {
                if(data)
                {
                    $('#createBusiness').css('background','darkgreen');
                    $('#createBusiness').css('border','2px solid darkgreen');
                    $('#createBusiness').css('color','white');
                    $('#createBusiness').text('Registro exitoso!');    
                    setTimeout(recargar, 1800);
                }
            }
        }
    );
}

document.getElementById('businessAvatar').onchange = function(e) 
{
    let reader = new FileReader();  
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = function()
    {
        let preview = document.getElementById('preview'),
        image = document.createElement('img');
        image.src = reader.result;
        preview.innerHTML = '';
        preview.append(image);
    };
}

function recargar()
{
    location.reload();
}

function startMap()
{
    navigator.geolocation.getCurrentPosition(function(position)
    {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        mapa = new google.maps.Map(document.getElementById('maps2'), {zoom: 5, center: {lat: latitude, lng: longitude}});
        marker = new google.maps.Marker({draggable: true, animation: google.maps.Animation.DROP, position: {lat: latitude, lng: longitude}, map: mapa});

        marker.addListener
        (
            'dragend', function(event)
            {
                longitude = this.getPosition().lng();
                latitude = this.getPosition().lat();
                document.getElementById('maps2').value = latitude + "," + longitude;
            }
        );
    });
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