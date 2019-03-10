window.onload = initUser;
var PersonAvatar, longitude, latitude, f, t, y, g, config;

f = 'https://www.facebook.com/Elite-Intelligence-Group-260263604734008/';
t = 'https://twitter.com/EliteIntellige1?lang=es';
y = 'https://www.youtube.com/channel/UCOvdAjzfv4WlwxKc1fi5JYQ';
g = 'https://plus.google.com/u/0/109910140252090488175';

config = 
{
    apiKey            : "AIzaSyA4F7aYKhXv5zEWabtUYABA-4lJJdAgyW4",
    authDomain        : "eliteintelligencegroup-719d3.firebaseapp.com",
    databaseURL       : "https://eliteintelligencegroup-719d3.firebaseio.com",
    projectId         : "eliteintelligencegroup-719d3",
    storageBucket     : "eliteintelligencegroup-719d3.appspot.com",
    messagingSenderId : "567347907651"
};

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

function createPerson()
{
    var IdUser   = localStorage.getItem('User');
    PersonAvatar = document.getElementById('personAvatar');

    var persona =
    {
        name                 : $('#cName').val(),
        profesionDescription : $('#cDescription').val(),
        email                : $('#cEmail').val(),
        phone                : $('#cPhone').val(),
        city                 : $('#cCity').val(),
        latitude             : latitude,
        longitude            : longitude,
        ciprin               : false,
        idUser               : IdUser
    };

    if(validateText(persona))
    {
        if(validateAvatar())
        {
            persona.phone =  $('#cIndex').val().substr(0,4).trim() + ' ' + persona.phone;

            $('#createPerson').css('background','yellow');
            $('#createPerson').css('border','2px solid yellow');
            $('#createPerson').css('color','black');
            $('#createPerson').text('Registrando ...');
    
            $.ajax
            (
                {
                    url: '../api/person',
                    type: 'POST',
                    data: JSON.stringify(persona),
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
            $('#createPerson').css('background','red');
            $('#createPerson').css('border','2px solid red');
            $('#createPerson').text('Debe seleccionar una FOTO de Avatar!');
        }
    }

    else
    {
        $('#createPerson').css('background','red');
        $('#createPerson').css('border','2px solid red');
        $('#createPerson').text('Entradas invalidas!');
    }
}

function validateText(input)
{
    var c1 = input.name.length                 >= 8;
    var c2 = input.profesionDescription.length >= 8;
    var c3 = input.email.length                >= 8;
    var c4 = input.phone.length                >= 5;
    var c5 = input.city.length                 >= 3;
    return c1 && c2 && c3 && c4 && c5;
}

function validateAvatar()
{
    return PersonAvatar.files[0] != null;
}

function loadAvatar(num)
{
    firebase.initializeApp(config);
    var storageRef = firebase.storage().ref();
    var fileName = 'P' + num;
    var uploadTask = storageRef.child('avatarP/' + fileName).put(PersonAvatar.files[0]);

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
            url: '../api/putAvatar',
            type: 'POST',
            data: JSON.stringify(parametrosPutAvatar),
            contentType: "application/json;charset=utf-8",

            success:
            function (data)
            {
                if(data)
                {
                    $('#createPerson').css('background','darkgreen');
                    $('#createPerson').css('border','2px solid darkgreen');
                    $('#createPerson').css('color','white');
                    $('#createPerson').text('Registro exitoso!');
                    setTimeout(recargar, 1800);
                }
            }
        }
    );
}

function recargar()
{
    location.reload();
}

document.getElementById('personAvatar').onchange = function(e) 
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

function to(num)
{
    switch(num)
    {
        case 1: 
        localStorage.clear();
        location.href = 'index.html';
        break;
        case 2:
        localStorage.setItem('Call', 1);
        location.href = 'editCreatedProfiles.html';
        break;
        default: 
        location.href = 'menu.html';
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