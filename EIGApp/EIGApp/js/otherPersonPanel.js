window.onload = initUser;

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

function createOtherPerson()
{
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
                city:                 $('#campoCity').val(),
                address:              $('#campoAddress').val(),
                avatar:               '',
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

    var campoAvatarPerson = document.getElementById('fileBrowser');
    var storageRef        = firebase.storage().ref();
    
    var AvatarPerson = campoAvatarPerson.files[0];

    var uploadTask = storageRef.child('avatar/' + 'OP' + num).put(AvatarPerson);

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
            url: '../api/otherPerson',
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

document.getElementById("fileBrowser").onchange = 
function(e) 
{
    let reader = new FileReader();
  
    reader.readAsDataURL(e.target.files[0]);
    
    console.log(e.target.files[0]);
    reader.onload = function()
    {
        let preview = document.getElementById('preview'),
        image = document.createElement('img');

        image.src = reader.result;

        image.id = 1;
        var imagen = $('#1');

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
    var c6 = $('#campoCity').val().length >= 8;
    var c7 = $('#campoAddress').val().length >= 8;

    return c1 && c2 && c3 && c4 && c5 && c6 && c7;
}

function validateAvatar()
{
    var campoAvatarPerson = document.getElementById('fileBrowser');
    var AvatarPerson = campoAvatarPerson.files[0];

    return AvatarPerson != null;
}

function recargar()
{
    location.reload();
}