window.onload = initUser;
var ProductAvatar;
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
        localStorage.removeItem('IdPackage');
        location.href = 'managePackage.html';
    }
}

function createProduct()
{
    ProductAvatar = document.getElementById('productAvatar');

    if(validateText())
    {
        if(validateAvatar())
        {
            var producto =
            {
                name: $('#campoName').val(),
                type: $('#campoType').val(),
                typeDescription: $('#campoTypeDescription').val(),
                attendantName: $('#campoAttendantName').val(),
                attendantWebPage: $('#campoAttendantWebPage').val(),
                attendantEmail: $('#campoAttendantEmail').val(),
                attendantPhone: $('#campoAttendantPhone').val(),
                latitude: latitude,
                longitude: longitude,
                date: $('#campoDate').val(),
                avatar: '',
                ciprin: 0,
                active: 0,
                idPackage: localStorage.getItem('IdPackage')
            };
        
            $('#createProduct').css('background','yellow');
            $('#createProduct').css('border','2px solid yellow');
            $('#createProduct').css('color','black');
            $('#createProduct').text('Agregando producto ...');
    
            $.ajax
            (
                {
                    url: '../api/product',
                    type: 'POST',
                    data: JSON.stringify(producto),
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
            $('#createProduct').css('background','red');
            $('#createProduct').css('border','2px solid red');
            $('#createProduct').text('No has seleccionado una FOTO!');
        }
    }

    else
    {
        $('#createProduct').css('background','red');
        $('#createProduct').css('border','2px solid red');
        $('#createProduct').text('Entradas invalidas!');
    }
}

function validateText()
{
    var c1 = $('#campoName').val().length >= 8;
    var c2 = $('#campoType').val().length >= 8;
    var c3 = $('#campoTypeDescription').val().length >= 8;
    var c4 = $('#campoAttendantName').val().length >= 8;
    var c5 = $('#campoAttendantWebPage').val().length >= 8;
    var c6 = $('#campoAttendantEmail').val().length >= 8;
    var c7 = $('#campoAttendantPhone').val().length >= 8;
    var c8 = $('#campoDate').val().length >= 8;

    return c1 && c2 && c3 && c4 && c5 && c6 && c7 && c8;
}

function validateAvatar()
{
    return ProductAvatar.files[0] != null;
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
    var uploadTask = storageRef.child('avatar/' + 'PR' + num).put(ProductAvatar.files[0]);

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
            url: '../api/parametroProduct',
            type: 'POST',
            data: JSON.stringify(parametrosPutAvatar),
            contentType: "application/json;charset=utf-8",

            success:
            function (data)
            {
                if(data)
                {
                    $('#createProduct').css('background','darkgreen');
                    $('#createProduct').css('border','2px solid darkgreen');
                    $('#createProduct').css('color','white');
                    $('#createProduct').text('Producto agregado!');    
                    setTimeout(recargar, 2500);
                }
            }
        }
    );
}

document.getElementById('productAvatar').onchange = function(e) 
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