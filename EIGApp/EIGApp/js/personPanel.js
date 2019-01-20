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

function createPerson()
{
    if(validate())
    {
        var persona =
        {
            name: $('#campoFullName').val(),
            profesionDescription: $('#campoProfesionDescription').val(),
            email: $('#campoEmail').val(),
            phone: $('#campoPhone').val(),
            city: $('#campoCity').val(),
            address: $('#campoAddress').val(),
            avatar: '',
            approved: false,
            idUser: localStorage.getItem('User')
        };
    

        $('#createPerson').css('background','yellow');
        $('#createPerson').css('border','2px solid yellow');
        $('#createPerson').css('color','black');
        $('#createPerson').text('Creando perfil de usuario...');

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
        $('#createPerson').text('NO existe foto de usuario!');
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

    var uploadTask = storageRef.child('avatar/' + 'P' + num).put(AvatarPerson);

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
        idPerson: num,
        downloadURL: downloadURL
    };

    $.ajax
    (
        {
            url: '../api/parametros',
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
                    $('#createPerson').text('Perfil ingresado con éxito!');
                    
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
    var c2 = $('#campoProfesionDescription').val().length >= 8;
    var c3 = $('#campoEmail').val().length >= 8;
    var c4 = $('#campoPhone').val().length >= 8;
    var c5 = $('#campoCity').val().length >= 8;
    var c6 = $('#campoAddress').val().length >= 8;


        $('#createPerson').css('background','red');
        $('#createPerson').css('border','2px solid red');
        $('#createPerson').text('Caracteres y digitos insuficientes!');

    var campoAvatarPerson = document.getElementById('fileBrowser');
    var AvatarPerson = campoAvatarPerson.files[0];

    return c1 && c2 && c3 && c4 && c5 && c6;
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