function createUser()
{
    if($('#campoPassword').val() == $('#campoPasswordAgain').val())
    {
        var usuario =
        {
            username: $('#campoUsername').val(),
            password: $('#campoPassword').val(),
            name: $('#campoName').val(),
            email: $('#campoEmail').val(),
            phone: $('#campoAddress').val(),
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
                        location.href = 'menu.html';    
                    }

                    else
                    {
                        $('#register').css('background','red');
                        $('#register').css('border','2px solid red');
                        $('#register').css('color','white');
                        $('#register').text('NO se pudo agregar la información!');
                    }
                }
            }
        );
    }

    else
    {
        $('#register').css('background','orangered');
        $('#register').css('border','2px solid orangered');
        $('#register').css('color','black');
        $('#register').text('Las contraseñas no coinciden!');
    }
}