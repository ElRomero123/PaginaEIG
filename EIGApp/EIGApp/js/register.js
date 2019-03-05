var f = 'https://www.facebook.com/Elite-Intelligence-Group-260263604734008/';
var t = 'https://twitter.com/EliteIntellige1?lang=es';
var y = 'https://www.youtube.com/channel/UCOvdAjzfv4WlwxKc1fi5JYQ';
var g = 'https://plus.google.com/u/0/109910140252090488175';

function createUser()
{
    var Username = $('#cUsername').val();
    $.ajax
    (
        {
            url: '../api/user/?username=' + Username,
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

function confirm()
{
    var pass1 = $('#cPass1').val();
    var pass2 = $('#cPass2').val();

    if(pass1 == pass2)
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

            if(check(usuario))
            {
                $('#register').css('background','yellow');
                $('#register').css('border','2px solid yellow');
                $('#register').css('color','black');
                $('#register').text('Registrando ...');
        
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
                                location.href = 'index.html';    
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
                $('#register').text('Entradas invalidas!');
            }
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

function check(user)
{
    var c1 = user.username.length >= 8;
    var c2 = user.password.length >= 6;
    var c3 = user.name.length >= 8;
    var c4 = user.email.length >= 8;
    var c5 = user.address.length >= 5;

    return c1 & c2 & c3 & c4 & c5;
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