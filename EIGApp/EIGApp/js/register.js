function validate()
{
    var check = false;
    
    $.ajax
    (
        {
            url: '../api/user/?username=' + $('#campoUsername').val(),
            type: 'GET',
            contentType: "application/json;charset=utf-8",

            success:
            function (data) 
            {
                check = data;
            }
        }
    );

    return check;
}

function createUser()
{
    if($('#campoPassword').val() == $('#campoPasswordAgain').val())
    {
        if(navigator.onLine)
        {
            if(validate())
            {
                var usuario =
                {
                    username: $('#campoUsername').val(),
                    password: $('#campoPassword').val(),
                    name: $('#campoName').val(),
                    email: $('#campoEmail').val(),
                    phone: $('#campoAddress').val(),
                    tienePerfil: false,
                    address: $('#campoAddress').val()
                };
        
                $('#register').css('background','yellow');
                $('#register').css('border','2px solid yellow');
                $('#register').css('color','black');
                $('#register').text('Agregando usuario ...');
        
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
                $('#register').text('USERNAME ya existente!');
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
        $('#register').text('Las contraseñas son diferentes!');
    }
}

function toMenu()
{
    location.href = 'index.html';
}