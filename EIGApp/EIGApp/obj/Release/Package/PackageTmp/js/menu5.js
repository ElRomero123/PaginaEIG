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

function to(num)
{
    switch(num)
    {
        case 1:
        localStorage.clear();
        location.href = 'index.html';
        break;
        case 2:
        location.href = 'manageCases.html';
        break;
        default:
        location.href = 'menu.html';
    }
}

function createC()
{
    if(validateText())
    {
        var caso =
        {
            name: $('#campoCase').val(),
            descriptionCase: $('#campoDescription').val(),
            idUser: localStorage.getItem('User')
        };
    
        $('#createCase').css('background','yellow');
        $('#createCase').css('border','2 px solid yellow');
        $('#createCase').css('color','black');
        $('#createCase').text('Subiendo archivo ...');
    
        $.ajax
        (
            {
                url: '../api/case',
                type: 'POST',
                data: JSON.stringify(caso),
                contentType: "application/json;charset=utf-8",
    
                success:
                function (data)
                {
                    if (data)
                    {
                        location.href = 'manageCases.html';    
                    }
    
                    else
                    {
                        $('#createCase').css('background','red');
                        $('#createCase').css('border','2px solid red');
                        $('#createCase').css('color','white');
                        $('#createCase').text('Error en el registro!');
                    }
                }
            }
        );
    }

    else
    {
        $('#createCase').css('background','red');
        $('#createCase').css('border','2px solid red');
        $('#createCase').text('Entradas invalidas!');
    }
}

function validateText()
{
    return true;
}