window.onload = initUser;
var PersonAvatar;
var longitude;
var latitude;

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
        location.href = 'menu.html';
    }
}

function createPerson()
{
    PersonAvatar = document.getElementById('personAvatar');

    if(validateText())
    {
        if(validateAvatar())
        {
            var persona =
            {
                name: $('#campoFullName').val(),
                profesionDescription: $('#campoProfesionDescription').val(),
                email: $('#campoEmail').val(),
                phone: $('#campoPhone').val(),
                latitude: latitude,
                longitude: longitude,
                ciprin: 0,
                active: 0,
                avatar: '',
                idUser: localStorage.getItem('User')
            };

            console.log(persona);
        
            $('#createPerson').css('background','yellow');
            $('#createPerson').css('border','2px solid yellow');
            $('#createPerson').css('color','black');
            $('#createPerson').text('Agregando persona ...');
    
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
            $('#createPerson').text('No has seleccionado una FOTO!');
        }
    }

    else
    {
        $('#createPerson').css('background','red');
        $('#createPerson').css('border','2px solid red');
        $('#createPerson').text('Entradas invalidas!');
    }
}

function validateText()
{
    var c1 = $('#campoFullName').val().length >= 8;
    var c2 = $('#campoProfesionDescription').val().length >= 8;
    var c3 = $('#campoEmail').val().length >= 8;
    var c4 = $('#campoPhone').val().length >= 8;

    return c1 && c2 && c3 && c4;
}

function validateAvatar()
{
    return PersonAvatar.files[0] != null;
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
    var uploadTask = storageRef.child('avatar/' + 'P' + num).put(PersonAvatar.files[0]);

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
            url: '../api/parametroPerson',
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
                    $('#createPerson').text('Persona agregada!');
                    setTimeout(recargar, 2500);
                }
            }
        }
    );
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

function recargar()
{
    location.reload();
}

function startMap()
{
    navigator.geolocation.getCurrentPosition(function(position)
    { 
        console.log(position);
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