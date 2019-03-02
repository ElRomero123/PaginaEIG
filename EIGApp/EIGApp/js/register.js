var f = 'https://www.facebook.com/Elite-Intelligence-Group-260263604734008/';
var t = 'https://twitter.com/EliteIntellige1?lang=es';
var y = 'https://www.youtube.com/channel/UCOvdAjzfv4WlwxKc1fi5JYQ';
var g = 'https://plus.google.com/u/0/109910140252090488175';

function createUser()
{
    var username = $('#cUsername').val();
    var name     = $('#cName').val();

    if(username.length >= 8 && name.length >= 8)
    {
        $.ajax
        (
            {
                url: '../api/user/?username=' + $('#campoUsername').val(),
                type: 'GET',
                contentType: "application/json;charset=utf-8",
    
                success:
                function (data) 
                {
                    if(data)
                    {
                        confirm();
                    }
    
                    else
                    {
                        $('#register').css('background','red');
                        $('#register').css('border','2px solid red');
                        $('#register').text('USERNAME ya existente!');
                    }
                }
            }
        );
    }

    else
    {
        $('#register').css('background','red');
        $('#register').css('border','2px solid red');
        $('#register').text('<Username> y/o <Nombre Completo> deben tener por lo menos 8 caracteres!');
    }
}

function confirm()
{
    var pass1 = $('#cPass1').val();
    var pass2 = $('#cPass2').val()

    if(pass1.equals(pass2))
    {
        if(navigator.onLine)
        {
            var usuario =
            {
                username: $('#cUsername').val(),
                password: $('#cPass1').val(),
                name: $('#cName').val(),
                email: $('#cEmail').val(),
                address: $('#cAddress').val()
            };
    
            $('#register').css('background','yellow');
            $('#register').css('border','2px solid yellow');
            $('#register').css('color','black');
            $('#register').text('Registrando usuario ...');
    
            $.ajax
            (
                {
                    url: '../api/user',
                    type: 'POST',
                    data: JSON.stringify(usuario),
                    contentType: "application/json;charset=utf-8",
        
                    success:
                    function (data)
                    {
                        if (data)
                        {
                            location.href = 'managePackage.html';    
                        }
    
                        else
                        {
                            $('#register').css('background','red');
                            $('#register').css('border','2px solid red');
                            $('#register').css('color','white');
                            $('#register').text('Error en el registro!');
                        }
                    }
                }
            );
        }

        else
        {
            $('#register').css('background','red');
            $('#register').css('border','2px solid red');
            $('#register').text('NO está conectado a Internet!');
        }
    }

    else
    {
        $('#register').css('background','red');
        $('#register').css('border','2px solid red');
        $('#register').text('Contraseñas NO coincidcen!');
    }
}

function toMenu()
{
    location.href = 'index.html';
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