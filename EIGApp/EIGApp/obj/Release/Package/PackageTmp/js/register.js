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
                        alert("Se agregó la información correctamente!");
                    }

                    else
                    {
                        alert("NO se pudo agregar la información!");
                    }
                }
            }
        );
    }

    else
    {
        alert("Las contraseñas no coinciden!");
    }
}