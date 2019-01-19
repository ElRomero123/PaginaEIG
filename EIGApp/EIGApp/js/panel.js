window.onload = initUser;
var fileBrowser;

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
        case 4: location.href = 'menu3.html';
        break;
        default: location.href = 'menu4.html';
    }
}

function create(num)
{
    switch(num)
    {
        case 1:
        createPerson();
        default:
        createOtherPerson();
    }
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
        avatar: '',
        approved: false,
        idUser: localStorage.getItem('User')
    };

    if(persona.name != null && persona.profesionDescription != null && persona.email != null && persona.phone != null && persona.city != null && persona.address != null)
    {
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
                    loadAvatar(data, 1);
                }
            }
        );
    }

    else
    {
        $('#createPerson').css('background','red');
        $('#createPerson').css('border','2px solid red');
        $('#createPerson').text('Caracteres y digitos insuficientes!');
    }
}

function createOtherPerson()
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

    if(otraPersona.name != null)
    {
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
                    loadAvatar(data, 2);
                }
            }
        );
    }

    else
    {
        $('#createOtherPerson').css('background','red');
        $('#createOtherPerson').css('border','2px solid red');
        $('#createOtherPerson').text('Caracteres y digitos insuficientes!');
    }
}

function loadAvatar(num, opcion)
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

    if(AvatarPerson != null)
    {
        switch(opcion)
        {
            case 1:
            var uploadTask = storageRef.child('avatar/' + 'P' + num).put(AvatarPerson);
            break;
            case 2:
            var uploadTask = storageRef.child('avatar/' + 'OP' + num).put(AvatarPerson);
            break;
        }
    
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
                    putAvatar(num, downloadURL, opcion);
                });
            }
        );
    }

    else
    {
        switch(opcion)
        {
            case 1:
                $('#createPerson').css('background','red');
                $('#createPerson').css('border','2px solid red');
                $('#createPerson').text('NO existe foto de usuario!');
            break;
            case 2:
                $('#createOtherPerson').css('background','red');
                $('#createOtherPerson').css('border','2px solid red');
                $('#createOtherPerson').text('NO existe foto de usuario!');
            break;
        }
        
        location.reload();
    }
}

function putAvatar(num, downloadURL, opcion)
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
                    switch(opcion)
                    {
                        case 1:
                        $('#createPerson').css('background','darkgreen');
                        $('#createPerson').css('border','2px solid darkgreen');
                        $('#createPerson').css('color','white');
                        $('#createPerson').text('Perfil ingresado con éxito!');
                        break;
                        case 2:
                        $('#createOtherPerson').css('background','darkgreen');
                        $('#createOtherPerson').css('border','2px solid darkgreen');
                        $('#createOtherPerson').css('color','white');
                        $('#createOtherPerson').text('Perfil ingresado con éxito!');
                        break;
                    }
                    
                    setTimeout(function(){ location.reload(); }, 2500);
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

function confirm(num)
{
    switch(num)
    {
        case 1:
        location.href = 'confirm.html';
        localStorage.setItem('Linea', 'Para empresas');
        localStorage.setItem('Producto', 'Producto 1');
        localStorage.setItem('Cantidad', '30');
        localStorage.setItem('FechaCompra', 'HOY');
        localStorage.setItem('Cubrimiento', '3 años');
        localStorage.setItem('Precio', '$400.000');
        localStorage.setItem('Llamado', '1');
        default:
        location.href = 'confirm.html';
        localStorage.setItem('Linea', 'Para instructores');
        localStorage.setItem('Producto', 'Producto 2');
        localStorage.setItem('Cantidad', '30');
        localStorage.setItem('FechaCompra', 'HOY');
        localStorage.setItem('Cubrimiento', '3 años');
        localStorage.setItem('Precio', '$500.000');
        localStorage.setItem('Llamado', '2');
    }
}