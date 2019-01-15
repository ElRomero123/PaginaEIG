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
        case 1: //alert('Crear persona funciona');
        loadAvatar(createPerson());
        putAvatar();
        break;
        default: alert('Crear otro tipo funciona');
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
    var storageRef = firebase.storage().ref();
    
    var AvatarPerson = campoAvatarPerson.files[0];
    var uploadTask = storageRef.child('avatar/' + num).put(AvatarPerson);
    
    uploadTask.on('state_changed', 
        function(snapshot)
        {
    
        },
        function(error)
        {
    
        },
        function()
        {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            localStorage.setItem('Descarga', downloadURL);
            });
        }
    );
}

function createPerson()
{
    var id = 0;

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
                alert(data);
                id = data;

            }
        }
    );

    localStorage.setItem('IdRegistro', id);
    return 'P' + id;
}

function putAvatar()
{
    $.ajax
    (
        {
            url: '../api/person/?idPerson=' + localStorage.getItem('IdRegistro') + '&downloadURL=' + localStorage.getItem('Descarga'),
            type: 'POST',
            contentType: "application/json;charset=utf-8",
            success:
            function (data)
            {
                if(data)
                {
                    alert("El perfil ha sido subido correctamente");
                    storage.removeItem('IdRegistro');
                    storage.removeItem('Descarga');
                }
            }
        }
    );
}