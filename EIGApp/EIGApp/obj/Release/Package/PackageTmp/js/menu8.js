window.onload = initUser;

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

function createSuggestion()
{
    alert('Crear sugerencia funciona!');
    /*
    $('#register').css('background','yellow');
    $('#register').css('border','2 px solid yellow');
    $('#register').css('color','black');
    $('#register').text('Enviando tu sugerencia ...');

    if(navigator.onLine)
    {
        var suggestion =
        {
            name:        $('#campoName').val(),
            description: $('#campoDocumentNumber').val(),
            idUser:      localStorage.getItem('User')
        };
    
        $.ajax
        (
            {
                url: '../api/suggestion',
                type: 'POST',
                data: JSON.stringify(suggestion),
                contentType: "application/json;charset=utf-8",
    
                success:
                function (data)
                {
                    if(data)
                    {
                        $('#register').css('background','darkgreen');
                        $('#register').css('border','2 px solid darkgreen');
                        $('#register').css('color','white');
                        $('#register').text('Sugerencia enviada!');
                    }
    
                    else
                    {
                        $('#register').css('background','red');
                        $('#register').css('border','2 px solid red');
                        $('#register').css('color','white');
                        $('#register').text('Error en el envío!');
                    }
                }
            }
        );
    }

    else
    {
        $('#register').css('background','red');
        $('#register').css('border','2 px solid red');
        $('#register').text('No estás conectado a Internet!');
    }
    */
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
        location.href = 'menu.html';
    }
}