window.onload = initUser;
var BusinessAvatar;

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
        localStorage.removeItem('IdPackage');
        location.href = 'managePackage.html';
    }
}

function createBusiness()
{
    BusinessAvatar = document.getElementById('businessAvatar');

    if(validateText())
    {
        if(validateAvatar())
        {
            var negocio =
            {
                name: $('#campoName').val(),
                specialism: $('#campoSpecialism').val(),
                specialismDescription: $('#campoSpecialismDescription').val(),
                webPage: $('#campoWebPage').val(),
                phone: $('#campoPhone').val(),
                city: $('#campoCity').val(),
                address: $('#campoAddress').val(),
                avatar: '',
                ciprin: 0,
                active: 0,
                idPackage: localStorage.getItem('IdPackage')
            };
        
            $('#createBusiness').css('background','yellow');
            $('#createBusiness').css('border','2px solid yellow');
            $('#createBusiness').css('color','black');
            $('#createBusiness').text('Agregando negocio ...');
    
            $.ajax
            (
                {
                    url: '../api/business',
                    type: 'POST',
                    data: JSON.stringify(negocio),
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
            $('#createBusiness').css('background','red');
            $('#createBusiness').css('border','2px solid red');
            $('#createBusiness').text('No has seleccionado una FOTO!');
        }
    }

    else
    {
        $('#createBusiness').css('background','red');
        $('#createBusiness').css('border','2px solid red');
        $('#createBusiness').text('Entradas invalidas!');
    }
}

function validateText()
{
    var c1 = $('#campoName').val().length >= 8;
    var c2 = $('#campoSpecialism').val().length >= 8;
    var c3 = $('#campoSpecialismDescription').val().length >= 8;
    var c4 = $('#campoWebPage').val().length >= 8;
    var c5 = $('#campoPhone').val().length >= 8;
    var c6 = $('#campoCity').val().length >= 8;
    var c7 = $('#campoAddress').val().length >= 8;

    return c1 && c2 && c3 && c4 && c5 && c6 && c7;
}

function validateAvatar()
{
    return BusinessAvatar.files[0] != null;
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

    var storageRef     = firebase.storage().ref();
    var uploadTask = storageRef.child('avatar/' + 'B' + num).put(BusinessAvatar.files[0]);

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
            url: '../api/parametroBusiness',
            type: 'POST',
            data: JSON.stringify(parametrosPutAvatar),
            contentType: "application/json;charset=utf-8",

            success:
            function (data)
            {
                if(data)
                {
                    $('#createBusiness').css('background','darkgreen');
                    $('#createBusiness').css('border','2px solid darkgreen');
                    $('#createBusiness').css('color','white');
                    $('#createBusiness').text('Negocio agregado!');    
                    setTimeout(recargar, 2500);
                }
            }
        }
    );
}

document.getElementById('businessAvatar').onchange = function(e) 
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