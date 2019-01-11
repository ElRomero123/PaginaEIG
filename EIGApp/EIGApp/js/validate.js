function option(num)
{
    switch(num)
    {
        case 1: alert('Opción 1: Validar usuario');
        validate(user, password);
        break;
        case 2: alert('Opción 2: Crear usuario nuevo');
        location.href = 'register.html';
        break;
    }
}

function validate(username, password)
{
    $.ajax
    (
        {
            url: '../api/person/?user=' + username + '&password=' + password,
            type: 'GET',
            contentType: "application/json;charset=utf-8",

            success:
            function (data) 
            {
                
            }
        }
    );
}