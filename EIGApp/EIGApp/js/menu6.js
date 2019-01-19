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



function createJobApplication()
{
    alert('Aplicación laboral funciona!');
    /*
    $('#register').css('background','yellow');
    $('#register').css('border','2 px solid yellow');
    $('#register').css('color','black');
    $('#register').text('Enviando tu solicitud ...');

    if(navigator.onLine)
    {
        var jobApplication =
        {
            name:                   $('#campoName').val(),
            documentNumber:         $('#campoDocumentNumber').val(),
            descriptionApplication: $('#campoDescriptionApplication').val(),
            age:                    $('#campoAge').val(),
            idUser:                 localStorage.getItem('User')
        };
    
        $.ajax
        (
            {
                url: '../api/jobApplication',
                type: 'POST',
                data: JSON.stringify(jobApplication),
                contentType: "application/json;charset=utf-8",
    
                success:
                function (data)
                {
                    if(data)
                    {
                        $('#register').css('background','darkgreen');
                        $('#register').css('border','2 px solid darkgreen');
                        $('#register').css('color','white');
                        $('#register').text('Solicitud enviada!');
                    }
    
                    else
                    {
                        $('#register').css('background','red');
                        $('#register').css('border','2 px solid red');
                        $('#register').css('color','white');
                        $('#register').text('Error al enviar!');
                    }
                }
            }
        );
    }

    else
    {
        $('#register').css('background','red');
        $('#register').css('border','2 px solid red');
        $('#register').text('No estás conectado a Internet!');
    }
    */
}

function upload()
{
    $('#submit').css('background','yellow');
    $('#submit').css('border','2 px solid yellow');
    $('#submit').css('color','black');
    $('#submit').text('Subiendo archivo ...');

    if(navigator.onLine)
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
    
        fileReference = firebase.storage().ref();
    
        var fileToUpload = fichero.files[0];
        var uploadTask = fileReference.child('avatar/' + fileToUpload.name).put(fileToUpload);
    
        uploadTask.on('state_changed', 
        
            function(snapshot)
            {
                //Se va mostrando el progreso de la subida
            },
    
            function(error)
            {
                alert('Hubo un error');
            },
            function()
            {
                $('#submit').css('background','darkgreen');
                $('#submit').css('border','2 px solid darkgreen');
                $('#submit').css('color','white');
                $('#submit').text('Archivo subido!');
            }
        );
    }

    else
    {
        $('#submit').css('background','red');
        $('#submit').css('border','2 px solid red');
        $('#submit').text('No estás conectado a Internet!');
    }
}

function createSuggestion()
{
    $('#register').css('background','yellow');
    $('#register').css('border','2 px solid yellow');
    $('#register').css('color','black');
    $('#register').text('Enviando tu sugerencia ...');

    if(navigator.onLine)
    {
        var suggestion =
        {
            name:        $('#campoName').val(),
            description: $('#campoDocumentNumber').val(),
            idUser:      localStorage.getItem('User')
        };
    
        $.ajax
        (
            {
                url: '../api/suggestion',
                type: 'POST',
                data: JSON.stringify(suggestion),
                contentType: "application/json;charset=utf-8",
    
                success:
                function (data)
                {
                    if(data)
                    {
                        $('#register').css('background','darkgreen');
                        $('#register').css('border','2 px solid darkgreen');
                        $('#register').css('color','white');
                        $('#register').text('Sugerencia enviada!');
                    }
    
                    else
                    {
                        $('#register').css('background','red');
                        $('#register').css('border','2 px solid red');
                        $('#register').css('color','white');
                        $('#register').text('Error en el envío!');
                    }
                }
            }
        );
    }

    else
    {
        $('#register').css('background','red');
        $('#register').css('border','2 px solid red');
        $('#register').text('No estás conectado a Internet!');
    }
}

function optionCreate(num)
{
    switch(num)
    {
        case 1:
        location.href = 'personPanel.html';
        break;
        case 2:
        location.href = 'otherPersonPanel.html';
        break;
        case 3:
        location.href = 'businessPanel.html';
        break;
        default:
        location.href = 'productPanel.html';
    }
}

function to(num)
{
    switch(num)
    {
        case 1:
        location.href = 'menu.html';
        break;
        case 2:
        location.href = 'menu2.html';
        break;
        case 3:
        location.href = 'menu3.html';
        break;
        case 4:
        location.href = 'menu4.html';
        break;
        case 5:
        location.href = 'menu5.html';
        break;
        case 6:
        location.href = 'menu6.html';
        break;
        case 7:
        location.href = 'menu7.html';
        break;
        default:
        location.href = 'menu8.html';
    }
}