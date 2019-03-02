function createUser()
{
    if($('#campoUsername').val().length >= 8 && $('#campoName').val().length >= 8)
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
                        
                        validate();
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
        $('#register').text('<Username> y <Nombre Completo> deben tener por lo menos 8 caracteres!');
    }
}

function validate()
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