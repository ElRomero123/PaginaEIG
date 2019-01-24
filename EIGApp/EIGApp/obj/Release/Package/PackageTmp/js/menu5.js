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

function upload()
{
    alert('Upload funciona');
    /*
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
    */
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
        location.href = 'index.html';
        break;
        default:
        location.href = 'menu.html';
    }
}