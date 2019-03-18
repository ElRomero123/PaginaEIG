window.onload = checkSesion;
var f = 'https://www.facebook.com/Elite-Intelligence-Group-260263604734008/';
var t = 'https://twitter.com/EliteIntellige1?lang=es';
var y = 'https://www.youtube.com/channel/UCOvdAjzfv4WlwxKc1fi5JYQ';
var g = 'https://plus.google.com/u/0/109910140252090488175';

function checkSesion()
{   
    if(localStorage.getItem('Email') != null)
    {
        location.href = 'menuAdministrator.html';
    }
}

function option(num)
{
    switch(num)
    {
        case 1:
            if(navigator.onLine)
            {
                validate();
            }

            else
            {
                $('#send').css('background','red');
                $('#send').css('border','2px solid red');
                $('#send').text('NO está conectado a internet!');
            }
        
        break;
        default: 
            location.href = 'index.html';
    }
}

function validate()
{
    var alias = document.getElementById('boxAlias').value;
    var clave = document.getElementById('boxPassword').value;

    $('#send').css('background','orangered');
    $('#send').css('border','2px solid orangered');
    $('#send').css('color','white');
    $('#send').text('Validando ...');

    $.ajax
    (
        {
            url: '../api/manager/?alias=' + alias + '&password=' + clave,
            type: 'GET',
            contentType: "application/json;charset=utf-8",

            success:
            function (data) 
            {
                if(data.Name != null)
                {
                    localStorage.setItem('Admin', data.Id);
                    localStorage.setItem('Name', data.Name);
                    localStorage.setItem('Email', data.Email);
                    location.href = 'menuAdministrator.html'; 
                }

                else
                {
                    $('#send').css('background','red');
                    $('#send').css('border','2px solid red');
                    $('#send').text('Administrador invalido!');
                }
            }
        }
    );
}

function visible()
{
    alert('Has introducido: ' + $('#boxPassword').val());
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