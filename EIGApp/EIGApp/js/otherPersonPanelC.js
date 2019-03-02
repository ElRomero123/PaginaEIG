window.onload = initUser;
var OtherPersonAvatar;
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
        default: 
        location.href = 'menu7.html';
    }
}

function createOtherPerson()
{
    OtherPersonAvatar = document.getElementById('otherPersonAvatar');

    if(validateText())
    {
        if(validateAvatar())
        {
            var otraPersona =
            {
                name:                 $('#campoFullName').val(),
                profesion:            $('#campoProfesion').val(),
                profesionDescription: $('#campoProfesionDescription').val(),
                email:                $('#campoEmail').val(),
                phone:                $('#campoPhone').val(),
                latitude:             latitude,
                longitude:            longitude,
                avatar:               '',
                ciprin:               1,
                active:               0,
                approved:             false,
                idUser:               localStorage.getItem('User')
            };

            $('#createOtherPerson').css('background','yellow');
            $('#createOtherPerson').css('border','2px solid yellow');
            $('#createOtherPerson').css('color','black');
            $('#createOtherPerson').text('Creando perfil de usuario...');
    
            $.ajax
            (
                {
                    url: '../api/otherPerson',
                    type: 'POST',
                    data: JSON.stringify(otraPersona),
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
            $('#createOtherPerson').css('background','red');
            $('#createOtherPerson').css('border','2px solid red');
            $('#createOtherPerson').text('NO existe foto de usuario!');
        }
    }

    else
    {
        $('#createOtherPerson').css('background','red');
        $('#createOtherPerson').css('border','2px solid red');
        $('#createOtherPerson').text('Entradas invalidas!');
    }
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
    var uploadTask = storageRef.child('avatar/' + 'OP' + num).put(OtherPersonAvatar.files[0]);

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
                putAvatar(num, downloadURL);
            });
        }
    );
}

function putAvatar(num, downloadURL)
{
    var parametrosPutAvatar =
    {
        id: num,
        downloadURL: downloadURL
    };

    $.ajax
    (
        {
            url: '../api/parametroOtherPerson',
            type: 'POST',
            data: JSON.stringify(parametrosPutAvatar),
            contentType: "application/json;charset=utf-8",

            success:
            function (data)
            {
                if(data)
                {
                    $('#createOtherPerson').css('background','darkgreen');
                    $('#createOtherPerson').css('border','2px solid darkgreen');
                    $('#createOtherPerson').css('color','white');
                    $('#createOtherPerson').text('Perfil ingresado con éxito!');
                    
                    setTimeout(recargar, 2500);
                }
            }
        }
    );
}

document.getElementById('otherPersonAvatar').onchange = function(e) 
{
    let reader = new FileReader();  
    reader.readAsDataURL(e.target.files[0]);
    
    console.log(e.target.files[0]);
    reader.onload = function()
    {
        let preview = document.getElementById('preview'),
        image = document.createElement('img');
        image.src = reader.result;
        preview.innerHTML = '';
        preview.append(image);
    };
}

function validateText()
{
    var c1 = $('#campoFullName').val().length >= 8;
    var c2 = $('#campoProfesion').val().length >= 8;
    var c3 = $('#campoProfesionDescription').val().length >= 8;
    var c4 = $('#campoEmail').val().length >= 8;
    var c5 = $('#campoPhone').val().length >= 8;

    return c1 && c2 && c3 && c4 && c5;
}

function validateAvatar()
{
    return OtherPersonAvatar.files[0] != null;
}

function recargar()
{
    location.reload();
}

function startMap()
{
    navigator.geolocation.getCurrentPosition(function(position)
    {
        mapa = new google.maps.Map(document.getElementById('maps2'), {zoom: 5, center: {lat: position.coords.latitude, lng: position.coords.longitude}});
        marker = new google.maps.Marker({draggable: true, animation: google.maps.Animation.DROP, position: {lat: position.coords.latitude, lng: position.coords.longitude}, map: mapa});

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