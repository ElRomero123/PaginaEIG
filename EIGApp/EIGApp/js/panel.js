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

function cerrarSesion()
{
    localStorage.clear();
    location.href = 'index.html';
}

function to(num)
{
    switch(num)
    {
        case 1: location.href = 'menu.html';
        break;
        case 2: location.href = 'menu2.html';
        break;
        case 3: location.href = 'menu3.html';
        break;
        default: location.href = 'menu4.html';
    }
}

function create(num)
{
    switch(num)
    {
        case 1:
        loadAvatar();
        break;
        default: alert('Crear otro tipo funciona');
    }
}

function loadAvatar()
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

    var uploadTask = storageRef.child('avatar/' + AvatarPerson.name).put(AvatarPerson);
    
    uploadTask.on
    (   
        'state_changed',
        function(snapshot)
        {

        },
        function(error)
        {
            alert('Hubo un error la subida del avatar!');
        },
        function()
        {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) 
            {    
                localStorage.setItem('Descarga', downloadURL);
                createPerson();
            });
        }
    );
}

function createPerson()
{
    var persona =
    {
        name: $('#campoFullName').val(),
        profesionDescription: $('#campoProfesionDescription').val(),
        email: $('#campoEmail').val(),
        phone: $('#campoPhone').val(),
        city: $('#campoCity').val(),
        address: $('#campoAddress').val(),
        avatar: localStorage.getItem('Descarga'),
        approved: false,
        idUser: localStorage.getItem('User')
    };
    
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
                if(data)
                {
                    //alert('Perfil registrado con éxito');
                    //localStorage.removeItem('Descarga');
                    location.reload();
                }
            }
        }
    );
}